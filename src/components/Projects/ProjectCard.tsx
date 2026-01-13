import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/utils/supabase-utils';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0 relative">
        {project.images && project.images.length > 0 ? (
          <Image
            className="h-64 w-full object-cover group-hover:opacity-75 transition-opacity duration-300"
            src={project.images[0]}
            alt={project.title}
            width={400}
            height={300}
          />
        ) : (
          <div className="bg-stone-200 h-64 w-full flex items-center justify-center">
            <span className="text-stone-500">Project Image</span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
            {project.category}
          </span>
        </div>
      </div>
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-600">
            {project.completion_date ? new Date(project.completion_date).getFullYear() : 'N/A'}
          </p>
          <Link href={`/projects/${project.id}`} className="block mt-2">
            <p className="text-xl font-semibold text-stone-900">{project.title}</p>
          </Link>
          <p className="mt-3 text-base text-stone-600">
            {project.description.substring(0, 100)}...
          </p>
          <div className="mt-4 flex items-center text-sm text-stone-500">
            <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-stone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            {project.location || 'Location not specified'}
          </div>
        </div>
        <div className="mt-6">
          <Link
            href={`/projects/${project.id}`}
            className="text-amber-600 font-medium hover:text-amber-500"
          >
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}