'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean; // If true, only allow admin users
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else if (adminOnly && !isAdmin) {
        // Redirect if user is not an admin but admin access is required
        router.push('/unauthorized');
      }
    }
  }, [user, isLoading, isAdmin, router, adminOnly]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is authenticated and meets requirements, show children
  if (user && (!adminOnly || (adminOnly && isAdmin))) {
    return <>{children}</>;
  }

  // Otherwise, return nothing while redirecting
  return null;
}