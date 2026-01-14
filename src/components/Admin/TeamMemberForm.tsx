'use client';

import { useState } from 'react';
import { TeamMember } from '@/utils/supabase-utils';
import MediaLibrary from '@/components/Admin/MediaLibrary';

export default function TeamMemberForm({
  member,
  onSave,
  onCancel
}: {
  member?: TeamMember;
  onSave: (data: Partial<TeamMember>, id?: string) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: member?.name || '',
    role: member?.role || '',
    bio: member?.bio || '',
    image_url: member?.image_url || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectImage = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image_url: url
    }));
    setShowMediaLibrary(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData, member?.id);
    } catch (error) {
      console.error('Error saving team member:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
        <h3 className="text-lg leading-6 font-medium text-stone-900">
          {member ? 'Edit Team Member' : 'Add New Team Member'}
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
              Full Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={`block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900 ${
                  errors.name ? 'border-red-300' : ''
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
          </div>

          <div className="sm:col-span-4">
            <label htmlFor="role" className="block text-sm font-medium text-stone-700">
              Role
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                className={`block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900 ${
                  errors.role ? 'border-red-300' : ''
                }`}
              />
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="bio" className="block text-sm font-medium text-stone-700">
              Bio
            </label>
            <div className="mt-1">
              <textarea
                id="bio"
                name="bio"
                rows={4}
                value={formData.bio || ''}
                onChange={handleChange}
                className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-stone-700">
              Profile Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {formData.image_url && (
                <div className="flex-shrink-0">
                  <img
                    src={formData.image_url}
                    alt="Profile preview"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={() => setShowMediaLibrary(true)}
                  className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  {formData.image_url ? 'Change Image' : 'Select Image'}
                </button>
                {formData.image_url && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                    className="ml-2 inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Member'}
          </button>
        </div>
      </form>

      {showMediaLibrary && (
        <MediaLibrary
          onImageSelect={handleSelectImage}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </div>
  );
}