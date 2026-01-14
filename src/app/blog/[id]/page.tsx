import { Metadata, ResolvingMetadata } from 'next'; // Import ResolvingMetadata
import { supabaseUtils, BlogPost } from '@/utils/supabase-utils';
import { notFound } from 'next/navigation';
import { URL } from 'url'; // Import URL for consistency, though Next.js handles it

interface BlogPostPageProps {
  params: { id: string };
}

// Optional: Generate static params for all blog posts at build time
// This helps Next.js pre-render pages for known blog post IDs.
export async function generateStaticParams() {
  const blogPosts = await supabaseUtils.getBlogPosts(false); // Fetch all posts including drafts
  return blogPosts
    .filter(post => post.id && typeof post.id === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(post.id))
    .map((post) => ({
      id: post.id,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps, parent: ResolvingMetadata): Promise<Metadata> { // Add parent parameter
  const { id } = params;

  // Defensive check for valid UUID format
  if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found due to an invalid ID.',
    };
  }

  const post = await supabaseUtils.getBlogPostById(id);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  // Optionally, retrieve parent (root) metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL('https://muhmusty-consult-firm.vercel.app'), // Set the base URL for metadata
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    keywords: post.title.split(' ').concat(['blog', 'architecture', 'engineering']).join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: 'article',
      url: `https://muhmusty-consult-firm.vercel.app/blog/${post.id}`, // Use the actual deployed domain
      images: [
        {
          url: post.featured_image || '/og-image-blog.jpg', // Fallback to a default image
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      images: [post.featured_image || '/og-image-blog.jpg'], // Fallback to a default image
    },
  };
}


export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = params;
  // Defensive check for valid UUID format
  if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
    notFound();
  }
  const post = await supabaseUtils.getBlogPostById(id);

  if (!post || !post.published) { // Only show published posts
    notFound();
  }

  return (
    <div className="min-h-screen bg-primary-very-light-brown py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg p-8">
        {post.featured_image && (
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}
        <h1 className="text-4xl font-extrabold text-primary-deep-brown mb-4">{post.title}</h1>
        <p className="text-sm text-stone-500 mb-6">
          By {post.author || 'Admin'} on {new Date(post.published_at || post.created_at).toLocaleDateString()}
        </p>
        <div className="prose prose-lg prose-amber max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
