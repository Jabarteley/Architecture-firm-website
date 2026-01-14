-- This script adds RLS policies to allow public read access to certain tables.
-- This is necessary for the public-facing website to be able to display content.

-- For projects, allow public read access only to published projects.
CREATE POLICY "Allow public read access to published projects" ON projects
FOR SELECT TO public
USING (published = true);

-- For services, allow public read access to all services.
CREATE POLICY "Allow public read access to services" ON services
FOR SELECT TO public
USING (true);

-- For team members, allow public read access to all team members.
CREATE POLICY "Allow public read access to team members" ON team_members
FOR SELECT TO public
USING (true);

-- For gallery items, allow public read access to all gallery items.
CREATE POLICY "Allow public read access to gallery items" ON gallery_items
FOR SELECT TO public
USING (true);

-- For blog posts, allow public read access only to published blog posts.
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
FOR SELECT TO public
USING (published = true);
