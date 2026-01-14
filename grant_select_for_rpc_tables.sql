-- This script ensures explicit SELECT grants for authenticated users on tables
-- accessed by the 'get_recent_activities' RPC function.
-- This is a debugging step to rule out RLS permission conflicts within the function.

-- Grant SELECT on 'projects' to authenticated users
GRANT SELECT ON TABLE public.projects TO authenticated;

-- Grant SELECT on 'team_members' to authenticated users
GRANT SELECT ON TABLE public.team_members TO authenticated;

-- Grant SELECT on 'blog_posts' to authenticated users
GRANT SELECT ON TABLE public.blog_posts TO authenticated;

-- Grant SELECT on 'contact_submissions' to authenticated users
GRANT SELECT ON TABLE public.contact_submissions TO authenticated;

-- Note: USAGE on the function is already granted in create_activity_feed_function.sql.
-- These grants should ideally be covered by existing RLS policies, but
-- explicit grants can help in debugging mysterious RLS-related 400 errors with RPCs.
