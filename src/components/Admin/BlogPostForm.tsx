'use client';

import { useState } from 'react';
import { BlogPost } from '@/utils/supabase-utils';
import MediaLibrary from '@/components/Admin/MediaLibrary';

export default function BlogPostForm({
  post,
  onSave,
  onCancel
}: {
  post?: BlogPost;
  onSave: (data: Partial<BlogPost>, id?: string) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featured_image: post?.featured_image || '',
    author: post?.author || '',
    published: post?.published || false,
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

  const handleTogglePublished = () => {
    setFormData(prev => ({
      ...prev,
      published: !prev.published
    }));
  };

  const handleSelectImage = (url: string) => {
    setFormData(prev => ({
      ...prev,
      featured_image: url
    }));
    setShowMediaLibrary(false);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.content) newErrors.content = 'Content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await onSave(formData, post?.id);
    } catch (error) {
      console.error('Error saving blog post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
        <h3 className="text-lg leading-6 font-medium text-stone-900">
          {post ? 'Edit Blog Post' : 'Add New Blog Post'}
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
                className={`block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md ${
                  errors.title ? 'border-red-300' : ''
                }`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="author" className="block text-sm font-medium text-stone-700">
              Author
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="author"
                id="author"
                value={formData.author || ''}
                onChange={handleChange}
                className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="excerpt" className="block text-sm font-medium text-stone-700">
              Excerpt
            </label>
            <div className="mt-1">
              <textarea
                id="excerpt"
                name="excerpt"
                rows={2}
                value={formData.excerpt || ''}
                onChange={handleChange}
                className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label className="block text-sm font-medium text-stone-700">
              Featured Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              {formData.featured_image && (
                <div className="flex-shrink-0">
                  <img 
                    src={formData.featured_image} 
                    alt="Featured preview" 
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
                  {formData.featured_image ? 'Change Image' : 'Select Image'}
                </button>
                {formData.featured_image && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                    className="ml-2 inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="content" className="block text-sm font-medium text-stone-700">
              Content
            </label>
            <div className="mt-1">
              <textarea
                id="content"
                name="content"
                rows={10}
                value={formData.content || ''}
                onChange={handleChange}
                className={`block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md ${
                  errors.content ? 'border-red-300' : ''
                }`}
              />
              {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
            </div>
          </div>

          <div className="sm:col-span-6">
            <div className="flex items-center">
              <input
                id="published"
                name="published"
                type="checkbox"
                checked={!!formData.published}
                onChange={handleTogglePublished}
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
            {isSubmitting ? 'Saving...' : 'Save Post'}
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