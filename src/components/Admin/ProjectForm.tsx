'use client';

import { useState } from 'react';
import { Project } from '@/utils/supabase-utils';
import MediaLibrary from '@/components/Admin/MediaLibrary';

export default function ProjectForm({
  project,
  onSave,
  onCancel
}: {
  project?: Project;
  onSave: (data: Partial<Project>, id?: string) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: project?.title || '',
    description: project?.description || '',
    client: project?.client || '',
    location: project?.location || '',
    completion_date: project?.completion_date || '',
    category: project?.category || '',
    images: project?.images || [],
    featured: project?.featured || false,
    published: project?.published || false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [tempImage, setTempImage] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: val
    }));
  };

  const handleAddImage = (url: string) => {
    setFormData(prev => ({
      ...prev,
      images: [...(prev.images || []), url]
    }));
    setShowMediaLibrary(false);
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.category) newErrors.category = 'Category is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData, project?.id);
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
        <h3 className="text-lg leading-6 font-medium text-stone-900">
          {project ? 'Edit Project' : 'Add New Project'}
        </h3>
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label htmlFor="title" className="block text-sm font-medium text-stone-700">
              Title
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md ${
                  errors.title ? 'border-red-300' : ''
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="category" className="block text-sm font-medium text-stone-700">
              Category
            </label>
            <div className="mt-1">
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md ${
                  errors.category ? 'border-red-300' : ''
                }`}
              >
                <option value="">Select a category</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Urban Planning">Urban Planning</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="client" className="block text-sm font-medium text-stone-700">
              Client
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="client"
                id="client"
                value={formData.client || ''}
                onChange={handleChange}
                className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="location" className="block text-sm font-medium text-stone-700">
              Location
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location || ''}
                onChange={handleChange}
                className={`block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md ${
                  errors.location ? 'border-red-300' : ''
                }`}
              />
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="completion_date" className="block text-sm font-medium text-stone-700">
              Completion Date
            </label>
            <div className="mt-1">
              <input
                type="date"
                name="completion_date"
                id="completion_date"
                value={formData.completion_date || ''}
                onChange={handleChange}
                className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-stone-700">
              Project Images
            </label>
            <div className="mt-1">
              <button
                type="button"
                onClick={() => setShowMediaLibrary(true)}
                className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Add Image
              </button>
              {formData.images && formData.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Project ${index + 1}`}
                        className="h-32 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="description" className="block text-sm font-medium text-stone-700">
              Description
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description || ''}
                onChange={handleChange}
                className={`block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md ${
                  errors.description ? 'border-red-300' : ''
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>

          <div className="sm:col-span-6">
            <div className="flex items-center">
              <input
                id="featured"
                name="featured"
                type="checkbox"
                checked={!!formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-stone-900">
                Featured Project
              </label>
            </div>
          </div>

          <div className="sm:col-span-6">
            <div className="flex items-center">
              <input
                id="published"
                name="published"
                type="checkbox"
                checked={!!formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-stone-900">
                Published
              </label>
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
            {isSubmitting ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>

      {showMediaLibrary && (
        <MediaLibrary
          onImageSelect={handleAddImage}
          onClose={() => setShowMediaLibrary(false)}
        />
      )}
    </div>
  );
}