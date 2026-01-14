import Image from 'next/image';
import Link from 'next/link';
import { Service } from '@/utils/supabase-utils';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0">
        {service.image_url ? (
          <Image
            className="h-48 w-full object-cover"
            src={service.image_url}
            alt={service.title}
            width={400}
            height={300}
          />
        ) : (
          <div className="bg-stone-200 h-48 w-full flex items-center justify-center">
            <span className="text-stone-500">Service Image</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-600">
            Architecture, Construction & Engineering
          </p>
          <Link href={`/services/${service.id}`} className="block mt-2">
            <p className="text-xl font-semibold text-stone-900">{service.title}</p>
            <p className="mt-3 text-base text-stone-600">
              {service.description.substring(0, 120)}...
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-stone-900">Learn more</p>
          </div>
        </div>
      </div>
    </div>
  );
}