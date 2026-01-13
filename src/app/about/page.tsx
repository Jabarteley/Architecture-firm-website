import { Metadata } from 'next';
import { supabaseUtils } from '@/utils/supabase-utils';
import TeamSection from '@/components/About/TeamSection';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our architecture firm\'s mission, vision, and values. Discover our team of expert architects and engineers dedicated to creating innovative design solutions.',
  keywords: ['about architecture firm', 'our team', 'mission', 'vision', 'values', 'architects', 'engineers'],
  openGraph: {
    title: 'About Us | Architecture Firm',
    description: 'Learn about our architecture firm\'s mission, vision, and values. Discover our team of expert architects and engineers dedicated to creating innovative design solutions.',
    type: 'website',
    images: [
      {
        url: '/og-image-about.jpg',
        width: 1200,
        height: 630,
        alt: 'About Architecture Firm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Architecture Firm',
    description: 'Learn about our architecture firm\'s mission, vision, and values. Discover our team of expert architects and engineers dedicated to creating innovative design solutions.',
    images: ['/og-image-about.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com/about',
  },
};

export default async function AboutPage() {
  const teamMembers = await supabaseUtils.getTeamMembers();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-stone-50 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-stone-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              About Our Firm
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-stone-600">
              Creating architectural excellence with innovation, sustainability, and timeless design.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base font-semibold text-amber-600 tracking-wide uppercase">Our Foundation</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-stone-900 sm:text-4xl">
              Mission & Vision
            </p>
            <p className="mt-4 max-w-2xl text-xl text-stone-600 lg:mx-auto">
              Learn about our core values and what drives our architectural excellence.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="bg-stone-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-amber-700">Our Mission</h3>
                <p className="mt-4 text-stone-600">
                  To create innovative architectural solutions that enhance human experiences,
                  respect the environment, and contribute to sustainable communities. We strive
                  to exceed client expectations through creative design, technical excellence,
                  and collaborative partnerships.
                </p>
              </div>

              <div className="bg-stone-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-amber-700">Our Vision</h3>
                <p className="mt-4 text-stone-600">
                  To be recognized as a leader in sustainable architecture, setting new standards
                  for design excellence and environmental responsibility. We envision a world where
                  thoughtful design creates spaces that inspire, connect, and endure for generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <TeamSection teamMembers={teamMembers} />

      {/* Values Section */}
      <div className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-amber-600 tracking-wide uppercase">Core Values</h2>
            <p className="mt-2 text-3xl font-extrabold text-stone-900 sm:text-4xl">
              What Drives Us
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-medium text-stone-900 text-center">Excellence</h3>
                <p className="mt-2 text-stone-600 text-center">
                  We pursue perfection in every detail, ensuring our designs meet the highest standards of quality.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-medium text-stone-900 text-center">Integrity</h3>
                <p className="mt-2 text-stone-600 text-center">
                  We maintain transparency and honesty in all our relationships, building trust with clients and partners.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-amber-100 text-amber-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-6 text-lg font-medium text-stone-900 text-center">Innovation</h3>
                <p className="mt-2 text-stone-600 text-center">
                  We embrace creativity and emerging technologies to push the boundaries of architectural design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}