import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/utils/supabase-utils';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex-shrink-0">
        {post.featured_image ? (
          <Image
            className="h-48 w-full object-cover"
            src={post.featured_image}
            alt={post.title}
            width={400}
            height={300}
          />
        ) : (
          <div className="bg-stone-200 h-48 w-full flex items-center justify-center">
            <span className="text-stone-500">Featured Image</span>
          </div>
        )}
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-600">
            {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Date not specified'}
          </p>
          <Link href={`/blog/${post.id}`} className="block mt-2">
            <p className="text-xl font-semibold text-stone-900">{post.title}</p>
            <p className="mt-3 text-base text-stone-600">
              {post.excerpt ? post.excerpt.substring(0, 120) : post.content.substring(0, 120)}...
            </p>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="ml-3">
            <p className="text-sm font-medium text-stone-900">Read more</p>
          </div>
        </div>
      </div>
    </div>
  );
}