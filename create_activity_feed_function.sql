-- Creates a database function to fetch a unified list of recent activities
-- from various tables (projects, team_members, blog_posts, contact_submissions).

CREATE OR REPLACE FUNCTION public.get_recent_activities(limit_count INT)
RETURNS TABLE(
    id UUID,
    type TEXT,
    action TEXT,
    target TEXT,
    created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    WITH recent_activities AS (
        -- Projects updated (covers creation as well, since updated_at is set on creation)
        SELECT
            p.id,
            'Project' AS type,
            -- Determine if it was a creation or an update
            CASE
                WHEN p.created_at = p.updated_at THEN 'created'
                ELSE 'updated'
            END AS action,
            p.title AS target,
            p.updated_at AS created_at
        FROM
            projects p
        UNION ALL
        -- Team members updated
        SELECT
            tm.id,
            'Team Member' AS type,
            CASE
                WHEN tm.created_at = tm.updated_at THEN 'added'
                ELSE 'updated'
            END AS action,
            tm.name AS target,
            tm.updated_at AS created_at
        FROM
            team_members tm
        UNION ALL
        -- Blog posts published
        SELECT
            bp.id,
            'Blog Post' AS type,
            'published' AS action,
            bp.title AS target,
            bp.published_at AS created_at
        FROM
            blog_posts bp
        WHERE
            bp.published = true AND bp.published_at IS NOT NULL
        UNION ALL
        -- Contact submissions received
        SELECT
            cs.id,
            'Contact Form' AS type,
            'received from' AS action,
            cs.name AS target,
            cs.created_at
        FROM
            contact_submissions cs
    )
    SELECT
        ra.id,
        ra.type,
        ra.action,
        ra.target,
        ra.created_at
    FROM
        recent_activities ra
    ORDER BY
        ra.created_at DESC
    LIMIT
        limit_count;
END;
$$;

-- Grant permission for your application to use this function
GRANT EXECUTE ON FUNCTION public.get_recent_activities(INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_recent_activities(INT) TO service_role;
