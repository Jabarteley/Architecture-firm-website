import Image from 'next/image';
import { GalleryItem } from '@/utils/supabase-utils';

export default function GalleryGrid({ galleryItems }: { galleryItems: GalleryItem[] }) {
  if (galleryItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-stone-900">No gallery items available</h3>
        <p className="mt-1 text-stone-600">Check back later for new additions to our gallery.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryItems.map((item) => (
        <div 
          key={item.id} 
          className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div className="aspect-w-16 aspect-h-12 h-80 overflow-hidden">
            {item.image_url ? (
              <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={item.image_url}
                alt={item.title || 'Gallery item'}
                width={600}
                height={400}
              />
            ) : (
              <div className="bg-stone-200 w-full h-full flex items-center justify-center">
                <span className="text-stone-500">No image</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm opacity-80">{item.category}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}