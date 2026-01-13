import { Metadata } from 'next';
import { supabaseUtils } from '@/utils/supabase-utils';
import ProjectCard from '@/components/Projects/ProjectCard';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Explore our portfolio of architectural projects showcasing innovative design solutions and engineering excellence.',
  keywords: ['architecture projects', 'portfolio', 'design solutions', 'engineering projects', 'residential projects', 'commercial projects'],
  openGraph: {
    title: 'Our Projects | Architecture Firm',
    description: 'Explore our portfolio of architectural projects showcasing innovative design solutions and engineering excellence.',
    type: 'website',
    images: [
      {
        url: '/og-image-projects.jpg',
        width: 1200,
        height: 630,
        alt: 'Architecture Firm Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects | Architecture Firm',
    description: 'Explore our portfolio of architectural projects showcasing innovative design solutions and engineering excellence.',
    images: ['/og-image-projects.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com/projects',
  },
};

export default async function ProjectsPage() {
  const projects = await supabaseUtils.getProjects();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-stone-50 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-stone-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Our Projects
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-stone-600">
              A showcase of our architectural excellence and innovative design solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
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
                Residential
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border-t border-b border-stone-200 hover:bg-stone-200"
              >
                Commercial
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 border border-stone-200 rounded-r-md hover:bg-stone-200"
              >
                Urban Planning
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-amber-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Our Impact
            </h2>
            <p className="mt-3 text-xl text-amber-100">
              We've transformed spaces and created lasting value for our clients.
            </p>
          </div>
          <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg font-medium text-amber-100">Projects Completed</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">250+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg font-medium text-amber-100">Years Experience</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">15+</dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg font-medium text-amber-100">Happy Clients</dt>
              <dd className="order-1 text-5xl font-extrabold text-white">180+</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}