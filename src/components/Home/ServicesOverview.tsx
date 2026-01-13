import Link from 'next/link';
import { Service } from '@/utils/supabase-utils';

export default function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-amber-600 tracking-wide uppercase">Our Expertise</h2>
          <p className="mt-2 text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Architectural Services
          </p>
          <p className="mt-4 max-w-2xl text-xl text-stone-600 mx-auto">
            We offer comprehensive architectural and engineering solutions tailored to your unique needs.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="pt-6 bg-stone-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-md shadow-sm">
                      <span className="text-amber-700 font-bold text-lg">A</span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-stone-900 tracking-tight">{service.title}</h3>
                    <p className="mt-5 text-base text-stone-600">
                      {service.description.substring(0, 100)}...
                    </p>
                    <div className="mt-6">
                      <Link 
                        href={`/services/${service.id}`}
                        className="text-amber-600 font-medium hover:text-amber-500"
                      >
                        Learn more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-700 hover:bg-amber-800"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}