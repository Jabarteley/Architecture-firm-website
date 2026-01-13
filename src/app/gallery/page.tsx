import { supabaseUtils } from '@/utils/supabase-utils';
import GalleryGrid from '@/components/Gallery/GalleryGrid';

export default async function GalleryPage() {
  const galleryItems = await supabaseUtils.getGalleryItems();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-stone-50 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-stone-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Project Gallery
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-stone-600">
              Visual journey through our architectural masterpieces and design innovations.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border border-stone-200 rounded-l-lg hover:bg-stone-200"
              >
                All
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border-t border-b border-stone-200 hover:bg-stone-200"
              >
                Interior
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border-t border-b border-stone-200 hover:bg-stone-200"
              >
                Exterior
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border border-stone-200 hover:bg-stone-200"
              >
                Concept
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border-t border-b border-stone-200 rounded-r-lg hover:bg-stone-200"
              >
                Master Plans
              </button>
            </div>
          </div>

          <GalleryGrid galleryItems={galleryItems} />
        </div>
      </div>
    </div>
  );
}