import { Metadata } from 'next';
import { supabaseUtils } from '@/utils/supabase-utils';
import GalleryGrid from '@/components/Gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Project Gallery',
  description: 'Visual journey through our architectural masterpieces and design innovations. Browse our collection of interior, exterior, and conceptual designs.',
  keywords: ['architecture gallery', 'project gallery', 'interior design', 'exterior design', 'conceptual designs', 'architectural photography'],
  openGraph: {
    title: 'Project Gallery | Architecture Firm',
    description: 'Visual journey through our architectural masterpieces and design innovations. Browse our collection of interior, exterior, and conceptual designs.',
    type: 'website',
    images: [
      {
        url: '/og-image-gallery.jpg',
        width: 1200,
        height: 630,
        alt: 'Architecture Firm Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Gallery | Architecture Firm',
    description: 'Visual journey through our architectural masterpieces and design innovations. Browse our collection of interior, exterior, and conceptual designs.',
    images: ['/og-image-gallery.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com/gallery',
  },
};

export default async function GalleryPage() {
  const galleryItems = await supabaseUtils.getGalleryItems();

  return (
    <div className="min-h-screen bg-primary-very-light-brown">
      {/* Hero Section */}
      <div className="relative bg-primary-light-brown py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl font-extrabold text-primary-deep-brown sm:text-5xl sm:tracking-tight lg:text-6xl">
              Project Gallery
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-dark-brown">
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
                className="px-4 py-2 text-sm font-medium text-primary-deep-brown bg-primary-light-brown border border-primary-dark-brown rounded-l-lg hover:bg-primary-dark-brown hover:text-white"
              >
                All
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-primary-deep-brown bg-primary-light-brown border-t border-b border-primary-dark-brown hover:bg-primary-dark-brown hover:text-white"
              >
                Interior
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-primary-deep-brown bg-primary-light-brown border-t border-b border-primary-dark-brown hover:bg-primary-dark-brown hover:text-white"
              >
                Exterior
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-primary-deep-brown bg-primary-light-brown border-t border-b border-primary-dark-brown hover:bg-primary-dark-brown hover:text-white"
              >
                Concept
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-primary-deep-brown bg-primary-light-brown border border-primary-dark-brown rounded-r-lg hover:bg-primary-dark-brown hover:text-white"
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