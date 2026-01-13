import { Metadata } from 'next';
import { supabaseUtils } from '@/utils/supabase-utils';
import BlogCard from '@/components/Blog/BlogCard';

export const metadata: Metadata = {
  title: 'Insights & News',
  description: 'Stay updated with the latest trends, project updates, and architectural insights from our experts.',
  keywords: ['architecture blog', 'industry news', 'design trends', 'project updates', 'architectural insights'],
  openGraph: {
    title: 'Insights & News | Architecture Firm',
    description: 'Stay updated with the latest trends, project updates, and architectural insights from our experts.',
    type: 'website',
    images: [
      {
        url: '/og-image-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'Architecture Firm Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & News | Architecture Firm',
    description: 'Stay updated with the latest trends, project updates, and architectural insights from our experts.',
    images: ['/og-image-blog.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com/blog',
  },
};

export default async function BlogPage() {
  const blogPosts = await supabaseUtils.getBlogPosts();

  return (
    <div className="min-h-screen bg-primary-very-light-brown">
      {/* Hero Section */}
      <div className="relative bg-primary-light-brown py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl font-extrabold text-primary-deep-brown sm:text-5xl sm:tracking-tight lg:text-6xl">
              Insights & News
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-primary-dark-brown">
              Latest trends, project updates, and architectural insights from our experts.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 fade-in">
              <h3 className="text-lg font-medium text-primary-deep-brown">No blog posts available</h3>
              <p className="mt-1 text-primary-dark-brown">Check back later for new articles.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}