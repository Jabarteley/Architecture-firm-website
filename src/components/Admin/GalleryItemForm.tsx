'use client';

import { useState } from 'react';
import { GalleryItem } from '@/utils/supabase-utils';
import MediaLibrary from '@/components/Admin/MediaLibrary';

export default function GalleryItemForm({
  item,
  onSave,
  onCancel
}: {
  item?: GalleryItem;
  onSave: (data: Partial<GalleryItem>, id?: string) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    title: item?.title || '',
    image_url: item?.image_url || '',
    category: item?.category || '',
    order_index: item?.order_index || 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'order_index' ? parseInt(value) : value
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

    if (!formData.image_url) newErrors.image_url = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSave(formData, item?.id);
    } catch (error) {
      console.error('Error saving gallery item:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
        <h3 className="text-lg leading-6 font-medium text-stone-900">
          {item ? 'Edit Gallery Item' : 'Add New Gallery Item'}
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
                value={formData.title || ''}
                onChange={handleChange}
                className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md"
              />
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
                value={formData.category || ''}
                onChange={handleChange}
                className="block w-full pl-3 pr-10 py-2 text-base border-stone-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
              >
                <option value="">Select a category</option>
                <option value="Exterior">Exterior</option>
                <option value="Interior">Interior</option>
                <option value="Concept">Concept</option>
                <option value="Master Plans">Master Plans</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-stone-700">
              Gallery Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {formData.image_url && (
                <div className="flex-shrink-0">
                  <img
                    src={formData.image_url}
                    alt="Gallery preview"
                    className="h-16 w-16 rounded-md object-cover"
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

          <div className="sm:col-span-2">
            <label htmlFor="order_index" className="block text-sm font-medium text-stone-700">
              Order Index
            </label>
            <div className="mt-1">
              <input
                type="number"
                name="order_index"
                id="order_index"
                value={formData.order_index || 0}
                onChange={handleChange}
                className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md"
              />
              <p className="mt-1 text-sm text-stone-500">Lower numbers appear first</p>
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
            {isSubmitting ? 'Saving...' : 'Save Item'}
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