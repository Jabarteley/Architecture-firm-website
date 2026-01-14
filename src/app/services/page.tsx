import { Metadata } from 'next';
import { supabaseUtils } from '@/utils/supabase-utils';
import ServiceCard from '@/components/Services/ServiceCard';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore our comprehensive architectural, construction and civil engineering services including residential architecture, commercial design, urban planning, construction management, and infrastructure development.',
  keywords: ['architecture services', 'construction services', 'civil engineering services', 'residential architecture', 'commercial design', 'urban planning', 'construction management', 'infrastructure development'],
  openGraph: {
    title: 'Our Services | Architecture Firm',
    description: 'Explore our comprehensive architectural, construction and civil engineering services including residential architecture, commercial design, urban planning, construction management, and infrastructure development.',
    type: 'website',
    images: [
      {
        url: '/og-image-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Architecture Firm Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Architecture Firm',
    description: 'Explore our comprehensive architectural, construction and civil engineering services including residential architecture, commercial design, urban planning, construction management, and infrastructure development.',
    images: ['/og-image-services.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com/services',
  },
};

export default async function ServicesPage() {
  const services = await supabaseUtils.getServices();

  return (
    <div className="min-h-screen bg-primary-very-light-brown">
      {/* Hero Section */}
      <div className="relative bg-primary-light-brown py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl font-extrabold text-primary-deep-brown sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-dark-brown">
              Comprehensive architectural, construction and civil engineering solutions tailored to your needs.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                className="slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Service Philosophy */}
      <div className="py-16 bg-text-primary-deep-brown">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="fade-in">
              <h2 className="text-3xl font-extrabold text-primary-very-light-brown sm:text-4xl">
                Our Approach
              </h2>
              <p className="mt-4 text-primary-very-light-brown text-lg">
                We believe in creating spaces that are not only aesthetically pleasing but also functional, sustainable, and responsive to the needs of the people who inhabit them. Our integrated approach combines innovative design with technical expertise to deliver exceptional results.
              </p>
              <dl className="mt-10 space-y-6">
                <div className="flex slide-up">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-light-brown text-primary-dark-brown">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-primary-very-light-brown">Quality Assurance</dt>
                    <dd className="mt-2 text-primary-very-light-brown">
                      We maintain the highest standards throughout the design and construction process.
                    </dd>
                  </div>
                </div>

                <div className="flex slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-light-brown text-primary-dark-brown">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-primary-very-light-brown">Innovation</dt>
                    <dd className="mt-2 text-primary-very-light-brown">
                      We leverage cutting-edge technology and design methodologies to create unique solutions.
                    </dd>
                  </div>
                </div>

                <div className="flex slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-light-brown text-primary-dark-brown">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <dt className="text-lg font-medium text-primary-very-light-brown">Collaboration</dt>
                    <dd className="mt-2 text-primary-very-light-brown">
                      We work closely with clients, contractors, and stakeholders to ensure project success.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="mt-10 lg:mt-0 slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="relative">
                <div className="relative h-96 rounded-md shadow-xl overflow-hidden">
                  <div className="bg-primary-light-brown w-full h-full flex items-center justify-center">
                    <span className="text-primary-dark-brown">Service Process Visualization</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}