import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/utils/supabase-utils';

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center fade-in">
          <h2 className="text-base font-semibold text-primary-dark-brown tracking-wide uppercase">Featured Works</h2>
          <p className="mt-2 text-3xl font-extrabold text-primary-deep-brown sm:text-4xl">
            Our Projects
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Explore our portfolio of innovative architectural solutions.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <Image
                      className="h-full w-full object-cover"
                      src={project.images[0]}
                      alt={project.title}
                      width={400}
                      height={300}
                    />
                  ) : (
                    <div className="bg-stone-200 h-full w-full flex items-center justify-center">
                      <span className="text-stone-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-primary-deep-brown">{project.title}</h3>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-light-brown text-primary-dark-brown">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-gray-600 line-clamp-2">
                    {project.description.substring(0, 100)}...
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">{project.location}</span>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-primary-dark-brown font-medium hover:text-primary-deep-brown"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center fade-in">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark-brown hover:bg-primary-deep-brown"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}