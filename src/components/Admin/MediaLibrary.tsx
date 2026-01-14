'use client';

import { useState, useRef } from 'react';

interface MediaLibraryProps {
  onImageSelect: (url: string) => void;
  onClose: () => void;
}

export default function MediaLibrary({ onImageSelect, onClose }: MediaLibraryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    // Helper function to convert file to Base64
    const toBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const base64File = await toBase64(file);

      // Upload via the API route
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file: base64File,
          folder: 'architecture-firm/media',
        }),
      });

      const result = await response.json();
      clearInterval(interval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error(result.message || 'Failed to upload image.');
      }

      setSelectedImage(result.url);
      onImageSelect(result.url);
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelect = (url: string) => {
    setSelectedImage(url);
    onImageSelect(url);
  };

  const handleUseImage = () => {
    if (selectedImage) {
      onImageSelect(selectedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium text-stone-900">Media Library</h2>
          <button
            onClick={onClose}
            className="text-stone-500 hover:text-stone-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Upload New Image
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                Choose File
              </button>
              {uploading && (
                <div className="flex-1">
                  <div className="w-full bg-stone-200 rounded-full h-2.5">
                    <div
                      className="bg-amber-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">Uploading... {uploadProgress}%</p>
                </div>
              )}
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <div>
            <h3 className="text-md font-medium text-stone-900 mb-4">Recent Uploads</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Placeholder images - in a real app, these would come from Cloudinary */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedImage === `placeholder-${index}`
                      ? 'border-amber-500 ring-2 ring-amber-200'
                      : 'border-stone-200 hover:border-amber-300'
                  }`}
                  onClick={() => handleImageSelect(`placeholder-${index}`)}
                >
                  <div className="aspect-square bg-stone-100 flex items-center justify-center">
                    <div className="bg-stone-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-4 border-t bg-stone-50">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleUseImage}
            disabled={!selectedImage}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
          >
            Use Selected Image
          </button>
        </div>
      </div>
    </div>
  );
}