import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/utils/supabase-utils';

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-amber-600 tracking-wide uppercase">Featured Works</h2>
          <p className="mt-2 text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Our Projects
          </p>
          <p className="mt-4 max-w-2xl text-xl text-stone-600 mx-auto">
            Explore our portfolio of innovative architectural solutions.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
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
                    <h3 className="text-lg font-medium text-stone-900">{project.title}</h3>
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                      {project.category}
                    </span>
                  </div>
                  <p className="mt-2 text-base text-stone-600 line-clamp-2">
                    {project.description.substring(0, 100)}...
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-stone-500">{project.location}</span>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-amber-600 font-medium hover:text-amber-500"
                    >
                      View details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}