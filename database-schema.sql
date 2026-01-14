-- Architecture Firm Website Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: team_members
-- Stores information about team members
CREATE TABLE IF NOT EXISTS team_members (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: services
-- Stores information about services offered
CREATE TABLE IF NOT EXISTS services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: projects
-- Stores project portfolio information
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    client VARCHAR(255),
    location VARCHAR(255),
    completion_date DATE,
    category VARCHAR(100),
    images TEXT[], -- Array of image URLs
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: gallery_items
-- Stores gallery images with categories
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255),
    image_url TEXT NOT NULL,
    category VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: blog_posts
-- Stores blog/news articles
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author VARCHAR(255),
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: contact_submissions
-- Stores contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: site_settings
-- Stores global site settings
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    site_title VARCHAR(255) DEFAULT 'Architecture Firm',
    site_description TEXT DEFAULT 'Professional Architecture and Civil Engineering Services',
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    office_address TEXT,
    logo_url TEXT,
    favicon_url TEXT,
    social_links JSONB DEFAULT '{}', -- JSON object for social media links
    maintenance_mode BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: users
-- Stores admin users
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    encrypted_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin', -- 'admin', 'editor'
    active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: pages
-- Stores dynamic page content
CREATE TABLE IF NOT EXISTS pages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL, -- URL slug (e.g., 'about', 'contact')
    title VARCHAR(255) NOT NULL,
    content TEXT,
    meta_title VARCHAR(255),
    meta_description TEXT,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (site_title, site_description)
VALUES ('Mohh-Musty', 'Professional Architecture, Construction and Civil Engineering Services')
ON CONFLICT DO NOTHING;

-- Insert default admin user (password should be securely hashed in production)
-- INSERT INTO users (email, encrypted_password, full_name, role) 
-- VALUES ('admin@example.com', 'hashed_password_here', 'Admin User', 'admin');

-- RLS (Row Level Security) policies
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policies for authenticated users (admins) to manage content
CREATE POLICY "Allow admins to read team members" ON team_members
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage team members" ON team_members
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow admins to read services" ON services
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage services" ON services
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow admins to read projects" ON projects
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage projects" ON projects
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow admins to read gallery items" ON gallery_items
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage gallery items" ON gallery_items
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow admins to read blog posts" ON blog_posts
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage blog posts" ON blog_posts
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow admins to read contact submissions" ON contact_submissions
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage contact submissions" ON contact_submissions
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow admins to read site settings" ON site_settings
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage site settings" ON site_settings
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

CREATE POLICY "Allow admins to read pages" ON pages
FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow admins to manage pages" ON pages
FOR ALL TO authenticated
USING (true) WITH CHECK (true);

-- Policy for anyone to submit contact forms
CREATE POLICY "Allow anyone to submit contact forms" ON contact_submissions
FOR INSERT TO public
WITH CHECK (true);

-- Indexes for better performance
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_location ON projects(location);
CREATE INDEX idx_projects_completion_date ON projects(completion_date);
CREATE INDEX idx_gallery_category ON gallery_items(category);
CREATE INDEX idx_blog_published ON blog_posts(published, published_at);
CREATE INDEX idx_pages_slug ON pages(slug);