import { Metadata } from 'next';
import { supabaseUtils } from '@/utils/supabase-utils';
import HeroSection from '@/components/Home/HeroSection';
import ServicesOverview from '@/components/Home/ServicesOverview';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import Testimonials from '@/components/Home/Testimonials';
import CallToAction from '@/components/Home/CallToAction';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Professional Architecture, Construction and Civil Engineering Services. We design, create and build innovative architectural solutions that blend aesthetics with functionality, creating spaces that inspire and endure.',
  keywords: ['architecture', 'construction', 'civil engineering', 'design', 'building', 'architectural firm', 'construction services', 'civil engineering projects'],
  openGraph: {
    title: 'Architecture Firm | Professional Architecture, Construction and Civil Engineering Services',
    description: 'Professional Architecture, Construction and Civil Engineering Services. We design, create and build innovative architectural solutions that blend aesthetics with functionality, creating spaces that inspire and endure.',
    type: 'website',
    images: [
      {
        url: 'https://medium.com/@matt-sharon/architecture-explained-phases-of-designing-building-a-project-e6d8a2a72945',
        width: 1200,
        height: 630,
        alt: 'Architecture Firm Home',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Firm | Professional Architecture, Construction and Civil Engineering Services',
    description: 'Professional Architecture, Construction and Civil Engineering Services. We design, create and build innovative architectural solutions that blend aesthetics with functionality, creating spaces that inspire and endure.',
    images: ['/og-image-home.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com',
  },
};

export default async function HomePage() {
  // Fetch data from Supabase
  const [services, projects] = await Promise.all([
    supabaseUtils.getServices(),
    supabaseUtils.getProjects({ category: 'featured' })
  ]);

  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16 fade-in">
          <h2 className="text-4xl font-bold text-primary-dark-brown mb-4">Our Expertise</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We specialize in architecture, construction, and civil engineering - designing, creating, and building innovative solutions that blend aesthetics with functionality,
            creating spaces that inspire and endure.
          </p>
        </div>
        <ServicesOverview services={services.slice(0, 4)} />
      </div>
      <div className="bg-primary-light-brown py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-primary-deep-brown mb-4">Featured Projects</h2>
            <p className="text-xl text-primary-deep-brown max-w-3xl mx-auto">
              Explore our portfolio of innovative architectural solutions.
            </p>
          </div>
          <FeaturedProjects projects={projects} />
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Testimonials />
      </div>
      <CallToAction />
    </main>
  );
}