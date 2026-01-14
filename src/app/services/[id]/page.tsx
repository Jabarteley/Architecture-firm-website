import { Metadata, ResolvingMetadata } from 'next'; // Import ResolvingMetadata
import { supabaseUtils, Service } from '@/utils/supabase-utils';
import { notFound } from 'next/navigation';
import { URL } from 'url'; // Import URL for consistency, though Next.js handles it

interface ServicePageProps {
  params: { id: string };
}

// Optional: Generate static params for all services at build time
export async function generateStaticParams() {
  const services = await supabaseUtils.getServices();
  // Ensure we only return valid IDs.
  return services
    .filter(service => service.id && typeof service.id === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(service.id))
    .map((service) => ({
      id: service.id,
    }));
}

export async function generateMetadata({ params }: ServicePageProps, parent: ResolvingMetadata): Promise<Metadata> { // Add parent parameter
  const { id } = params;

  // Defensive check for valid UUID format
  if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found due to an invalid ID.',
    };
  }
  const service = await supabaseUtils.getServiceById(id);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  // Optionally, retrieve parent (root) metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL('https://muhmusty-consult-firm.vercel.app'), // Set the base URL for metadata
    title: service.title,
    description: service.description.substring(0, 160),
    keywords: service.title.split(' ').concat(['service', 'architecture', 'engineering']).join(', '),
    openGraph: {
      title: service.title,
      description: service.description.substring(0, 160),
      type: 'website',
      url: `https://muhmusty-consult-firm.vercel.app/services/${service.id}`, // Use the actual deployed domain
      images: [
        {
          url: service.image_url || '/og-image-services.jpg', // Fallback to a default image
          width: 1200,
          height: 630,
          alt: service.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.title,
      description: service.description.substring(0, 160),
      images: [service.image_url || '/og-image-services.jpg'], // Fallback to a default image
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = params;
  // Defensive check for valid UUID format
  if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
    notFound();
  }
  const service = await supabaseUtils.getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-primary-very-light-brown py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg p-8">
        {service.image_url && (
          <img
            src={service.image_url}
            alt={service.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl font-extrabold text-primary-deep-brown mb-4">{service.title}</h1>
        <div className="prose prose-lg prose-amber max-w-none">
          <p>{service.description}</p>
        </div>
      </div>
    </div>
  );
}