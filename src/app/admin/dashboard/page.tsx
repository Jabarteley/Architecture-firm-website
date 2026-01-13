import { Suspense } from 'react';
import { supabaseUtils } from '@/utils/supabase-utils';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardStats from '@/components/Admin/DashboardStats';
import RecentActivity from '@/components/Admin/RecentActivity';

async function DashboardContent() {
  try {
    const [projects, teamMembers, blogPosts, contactSubmissions] = await Promise.all([
      supabaseUtils.getProjects(),
      supabaseUtils.getTeamMembers(),
      supabaseUtils.getBlogPosts(false), // Get all posts, published and draft
      supabaseUtils.getContactSubmissions(),
    ]);

    return (
      <div className="space-y-6">
        <DashboardStats 
          projectsCount={projects.length} 
          teamMembersCount={teamMembers.length} 
          blogPostsCount={blogPosts.length} 
          contactSubmissionsCount={contactSubmissions.length} 
        />
        <RecentActivity />
      </div>
    );
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <h3 className="text-red-800 font-medium">Error loading data</h3>
        <p className="text-red-600 text-sm mt-1">Unable to load dashboard statistics. Please try again later.</p>
      </div>
    );
  }
}

export default function DashboardPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-stone-900">Admin Dashboard</h1>
          <p className="mt-2 text-stone-600">Manage your architecture firm website content</p>
        </div>

        <Suspense fallback={<div>Loading dashboard...</div>}>
          <DashboardContent />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}