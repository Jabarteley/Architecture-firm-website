import { Metadata } from 'next';
import { supabaseUtils, Service } from '@/utils/supabase-utils';
import { notFound } from 'next/navigation';

interface ServicePageProps {
  params: { id: string };
}

// Optional: Generate static params for all services at build time
export async function generateStaticParams() {
  const services = await supabaseUtils.getServices();
  return services.map((service) => ({
    id: service.id,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { id } = params;
  const service = await supabaseUtils.getServiceById(id);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: service.title,
    description: service.description.substring(0, 160),
    keywords: service.title.split(' ').concat(['service', 'architecture', 'engineering']).join(', '),
    openGraph: {
      title: service.title,
      description: service.description.substring(0, 160),
      type: 'website',
      url: `https://your-domain.com/services/${service.id}`, // Replace with your actual domain
      images: [
        {
          url: service.image_url || '/og-image-services.jpg', // Fallback to a default image
          width: 1200,
          height: 630,
          alt: service.title,
        },
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