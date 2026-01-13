import Link from 'next/link';
import { Service } from '@/utils/supabase-utils';

export default function ServicesOverview({ services }: { services: Service[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center fade-in">
          <h2 className="text-base font-semibold text-primary-dark-brown tracking-wide uppercase">Our Expertise</h2>
          <p className="mt-2 text-3xl font-extrabold text-primary-deep-brown sm:text-4xl">
            Architectural Services
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            We offer comprehensive architectural and engineering solutions tailored to your unique needs.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`pt-6 bg-stone-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 hover-lift slide-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-light-brown rounded-md shadow-sm">
                      <span className="text-primary-dark-brown font-bold text-lg">A</span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-primary-deep-brown tracking-tight">{service.title}</h3>
                    <p className="mt-5 text-base text-gray-600">
                      {service.description.substring(0, 100)}...
                    </p>
                    <div className="mt-6">
                      <Link
                        href={`/services/${service.id}`}
                        className="text-primary-dark-brown font-medium hover:text-primary-deep-brown"
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

        <div className="mt-12 text-center fade-in">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark-brown hover:bg-primary-deep-brown"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}