'use client';

import { useState, useEffect } from 'react';
import { supabaseUtils, GalleryItem } from '@/utils/supabase-utils';
import ProtectedRoute from '@/components/ProtectedRoute';
import GalleryItemForm from '@/components/Admin/GalleryItemForm';

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGalleryItems();
  }, []);

  const loadGalleryItems = async () => {
    try {
      setLoading(true);
      const data = await supabaseUtils.getGalleryItems();
      setGalleryItems(data);
    } catch (err) {
      setError('Failed to load gallery items');
      console.error('Error loading gallery items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (itemData: Partial<GalleryItem>, id?: string) => {
    try {
      if (id) {
        // Update existing item
        const updatedItem = await supabaseUtils.updateGalleryItem(id, itemData);
        setGalleryItems(galleryItems.map(i => i.id === id ? updatedItem : i));
      } else {
        // Create new item
        const newItem = await supabaseUtils.createGalleryItem(itemData as Omit<GalleryItem, 'id' | 'created_at'>);
        setGalleryItems([...galleryItems, newItem]);
      }
      setShowForm(false);
      setEditingItem(null);
    } catch (err) {
      setError('Failed to save gallery item');
      console.error('Error saving gallery item:', err);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this gallery item?')) {
      try {
        await supabaseUtils.deleteGalleryItem(id);
        setGalleryItems(galleryItems.filter(item => item.id !== id));
      } catch (err) {
        setError('Failed to delete gallery item');
        console.error('Error deleting gallery item:', err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
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
          <h1 className="text-3xl font-bold text-stone-900">Manage Gallery</h1>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Add Item
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
          <GalleryItemForm
            item={editingItem || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div key={item.id} className="bg-white shadow overflow-hidden rounded-lg">
                <div className="h-48 overflow-hidden">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title || 'Gallery item'} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="bg-stone-200 w-full h-full flex items-center justify-center">
                      <span className="text-stone-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-stone-900 truncate">{item.title}</h3>
                  <p className="text-sm text-stone-500">{item.category}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-stone-600 hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {galleryItems.length === 0 && !showForm && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-stone-900">No gallery items</h3>
            <p className="mt-1 text-sm text-stone-500">Get started by adding a new gallery item.</p>
            <div className="mt-6">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Add Item
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}