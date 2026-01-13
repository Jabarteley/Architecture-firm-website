'use client';

import { useState, useEffect } from 'react';
import { supabaseUtils, TeamMember } from '@/utils/supabase-utils';
import ProtectedRoute from '@/components/ProtectedRoute';
import TeamMemberForm from '@/components/Admin/TeamMemberForm';

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const data = await supabaseUtils.getTeamMembers();
      setTeamMembers(data);
    } catch (err) {
      setError('Failed to load team members');
      console.error('Error loading team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (memberData: Partial<TeamMember>, id?: string) => {
    try {
      if (id) {
        // Update existing member
        const updatedMember = await supabaseUtils.updateTeamMember(id, memberData);
        setTeamMembers(teamMembers.map(m => m.id === id ? updatedMember : m));
      } else {
        // Create new member
        const newMember = await supabaseUtils.createTeamMember(memberData as Omit<TeamMember, 'id' | 'created_at'>);
        setTeamMembers([...teamMembers, newMember]);
      }
      setShowForm(false);
      setEditingMember(null);
    } catch (err) {
      setError('Failed to save team member');
      console.error('Error saving team member:', err);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await supabaseUtils.deleteTeamMember(id);
        setTeamMembers(teamMembers.filter(member => member.id !== id));
      } catch (err) {
        setError('Failed to delete team member');
        console.error('Error deleting team member:', err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMember(null);
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
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-stone-900">Manage Team</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Add Member
          </button>
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

        {showForm ? (
          <TeamMemberForm
            member={editingMember || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-stone-200">
              {teamMembers.map((member) => (
                <li key={member.id}>
                  <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-amber-600 truncate">{member.name}</p>
                        <p className="text-sm text-stone-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(member)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {teamMembers.length === 0 && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-stone-900">No team members</h3>
                <p className="mt-1 text-sm text-stone-500">Get started by adding a new team member.</p>
                <div className="mt-6">
                  <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}