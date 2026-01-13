import Image from 'next/image';
import { TeamMember } from '@/utils/supabase-utils';

export default function TeamSection({ teamMembers }: { teamMembers: TeamMember[] }) {
  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-amber-600 tracking-wide uppercase">Our Team</h2>
          <p className="mt-2 text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Meet Our Experts
          </p>
          <p className="mt-4 max-w-2xl text-xl text-stone-600 mx-auto">
            Our talented architects and engineers bring creativity and expertise to every project.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="bg-stone-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-64 overflow-hidden">
                  {member.image_url ? (
                    <Image
                      className="h-full w-full object-cover"
                      src={member.image_url}
                      alt={member.name}
                      width={400}
                      height={400}
                    />
                  ) : (
                    <div className="bg-stone-200 h-full w-full flex items-center justify-center">
                      <span className="text-stone-500">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-stone-900">{member.name}</h3>
                  <p className="text-amber-600 font-medium">{member.role}</p>
                  <p className="mt-4 text-stone-600">
                    {member.bio.substring(0, 120)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}