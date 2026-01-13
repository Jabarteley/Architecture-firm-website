import { Metadata } from 'next';
import { supabaseUtils } from '@/utils/supabase-utils';
import HeroSection from '@/components/Home/HeroSection';
import ServicesOverview from '@/components/Home/ServicesOverview';
import FeaturedProjects from '@/components/Home/FeaturedProjects';
import Testimonials from '@/components/Home/Testimonials';
import CallToAction from '@/components/Home/CallToAction';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Professional Architecture and Civil Engineering Services. We design innovative architectural solutions that blend aesthetics with functionality, creating spaces that inspire and endure.',
  keywords: ['architecture', 'civil engineering', 'design', 'construction', 'building', 'architectural firm'],
  openGraph: {
    title: 'Architecture Firm | Professional Architecture and Civil Engineering Services',
    description: 'Professional Architecture and Civil Engineering Services. We design innovative architectural solutions that blend aesthetics with functionality, creating spaces that inspire and endure.',
    type: 'website',
    images: [
      {
        url: '/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Architecture Firm Home',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Architecture Firm | Professional Architecture and Civil Engineering Services',
    description: 'Professional Architecture and Civil Engineering Services. We design innovative architectural solutions that blend aesthetics with functionality, creating spaces that inspire and endure.',
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
    <main>
      <HeroSection />
      <ServicesOverview services={services.slice(0, 4)} />
      <FeaturedProjects projects={projects} />
      <Testimonials />
      <CallToAction />
    </main>
  );
}