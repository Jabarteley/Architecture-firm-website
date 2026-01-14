import { supabase } from '@/lib/supabase';

// Types for our database entities
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  client: string;
  location: string;
  completion_date: string;
  category: string;
  images: string[]; // Array of image URLs
  featured: boolean;
  published: boolean;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  order_index: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  author: string;
  published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  office_address: string;
  logo_url: string;
  favicon_url: string;
  social_links: Record<string, string>; // e.g. { facebook: 'url', twitter: 'url', instagram: 'url' }
  maintenance_mode: boolean;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  active: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
}

// Generic CRUD operations
export const supabaseUtils = {
  // Team Members
  getTeamMembers: async () => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as TeamMember[];
  },

  getTeamMemberById: async (id: string) => {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as TeamMember;
  },

  createTeamMember: async (memberData: Omit<TeamMember, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('team_members')
      .insert([{ ...memberData, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data as TeamMember;
  },

  updateTeamMember: async (id: string, memberData: Partial<Omit<TeamMember, 'id' | 'created_at'>>) => {
    const { data, error } = await supabase
      .from('team_members')
      .update({ ...memberData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as TeamMember;
  },

  deleteTeamMember: async (id: string) => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Services
  getServices: async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Service[];
  },

  getServiceById: async (id: string) => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Service;
  },

  createService: async (serviceData: Omit<Service, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('services')
      .insert([{ ...serviceData, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data as Service;
  },

  updateService: async (id: string, serviceData: Partial<Omit<Service, 'id' | 'created_at'>>) => {
    const { data, error } = await supabase
      .from('services')
      .update({ ...serviceData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Service;
  },

  deleteService: async (id: string) => {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Projects
  getProjects: async (filters?: { category?: string; location?: string; year?: string; featured?: boolean; published?: boolean }) => {
    // Default to published=true for public facing projects, unless explicitly overridden
    const publishedFilter = filters?.published !== undefined ? filters.published : true;

    let query = supabase.from('projects').select('*').order('completion_date', { ascending: false });

    // Apply published filter: default to true for public, allow override for admin
    if (filters?.published !== undefined) {
      // If explicitly set (true or false), use that value
      query = query.eq('published', filters.published);
    } else {
      // Otherwise, default to published=true for public view
      query = query.eq('published', true);
    }

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters?.year) {
      query = query.ilike('completion_date', `${filters.year}%`);
    }

    if (filters?.featured !== undefined) {
      query = query.eq('featured', filters.featured);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Project[];
  },

  getProjectById: async (id: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Project;
  },

  createProject: async (projectData: Omit<Project, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ ...projectData, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  updateProject: async (id: string, projectData: Partial<Omit<Project, 'id' | 'created_at'>>) => {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...projectData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Project;
  },

  deleteProject: async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Gallery
  getGalleryItems: async (category?: string) => {
    let query = supabase.from('gallery_items').select('*').order('order_index', { ascending: true });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data as GalleryItem[];
  },

  createGalleryItem: async (itemData: Omit<GalleryItem, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('gallery_items')
      .insert([{ ...itemData, created_at: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data as GalleryItem;
  },

  updateGalleryItem: async (id: string, itemData: Partial<Omit<GalleryItem, 'id' | 'created_at'>>) => {
    const { data, error } = await supabase
      .from('gallery_items')
      .update({ ...itemData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as GalleryItem;
  },

  deleteGalleryItem: async (id: string) => {
    const { error } = await supabase
      .from('gallery_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Blog
  getBlogPosts: async (publishedOnly: boolean = true) => {
    let query = supabase.from('blog_posts').select('*');

    if (publishedOnly) {
      query = query.eq('published', true);
    }

    const { data, error } = await query.order('published_at', { ascending: false });

    if (error) throw error;
    return data as BlogPost[];
  },

  getBlogPostById: async (id: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  createBlogPost: async (postData: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([{
        ...postData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  updateBlogPost: async (id: string, postData: Partial<Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...postData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  deleteBlogPost: async (id: string) => {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Site Settings
  getSiteSettings: async () => {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single();

    if (error) throw error;
    return data as SiteSettings;
  },

  updateSiteSettings: async (settingsData: Partial<Omit<SiteSettings, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase
      .from('site_settings')
      .update({
        ...settingsData,
        updated_at: new Date().toISOString()
      })
      .eq('id', '1') // Assuming single settings record
      .select()
      .single();

    if (error) throw error;
    return data as SiteSettings;
  },

  // Contact Submissions (admin only)
  getContactSubmissions: async () => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as ContactSubmission[];
  },

  createContactSubmission: async (submission: Omit<ContactSubmission, 'id' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        ...submission,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data as ContactSubmission;
  },

  deleteContactSubmission: async (id: string) => {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Users (admin only)
  getUsers: async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as User[];
  },

  getUserById: async (id: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as User;
  },

  createUser: async (userData: Omit<User, 'id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  updateUser: async (id: string, userData: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>) => {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...userData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as User;
  },

  deleteUser: async (id: string) => {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};