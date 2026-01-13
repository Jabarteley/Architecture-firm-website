'use client';

import { useState, useEffect } from 'react';
import { supabaseUtils, ContactSubmission } from '@/utils/supabase-utils';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      setLoading(true);
      const data = await supabaseUtils.getContactSubmissions();
      setSubmissions(data);
    } catch (err) {
      setError('Failed to load contact submissions');
      console.error('Error loading contact submissions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this contact submission?')) {
      try {
        await supabaseUtils.deleteContactSubmission(id);
        setSubmissions(submissions.filter(submission => submission.id !== id));
      } catch (err) {
        setError('Failed to delete contact submission');
        console.error('Error deleting contact submission:', err);
      }
    }
  };

  if (loading) {
    return (
      <ProtectedRoute adminOnly={true}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-stone-900">Contact Submissions</h1>
          <p className="mt-2 text-stone-600">Manage inquiries from your website contact form</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-stone-200">
            {submissions.map((submission) => (
              <li key={submission.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-amber-600 truncate">{submission.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-stone-500">{new Date(submission.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="text-sm text-stone-500">{submission.email}</p>
                      {submission.phone && (
                        <p className="mt-2 text-sm text-stone-500 sm:mt-0 sm:ml-6">Phone: {submission.phone}</p>
                      )}
                    </div>
                    <div className="mt-2 flex items-center text-sm text-stone-500 sm:mt-0">
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-stone-700">{submission.message}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {submissions.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-stone-900">No contact submissions</h3>
              <p className="mt-1 text-sm text-stone-500">Contact form submissions will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}