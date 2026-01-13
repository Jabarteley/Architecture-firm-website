import { Metadata } from 'next';

interface PageMetadata {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  twitterCreator?: string;
}

export function generatePageMetadata({
  title,
  description = 'Professional Architecture and Civil Engineering Services',
  keywords = 'architecture, civil engineering, design, construction, building',
  canonical,
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@architecture_firm',
  twitterCreator = '@architecture_firm'
}: PageMetadata): Metadata {
  return {
    title: `${title} | Architecture Firm`,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Architecture Firm',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
        },
      ],
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [ogImage],
      site: twitterSite,
      creator: twitterCreator,
    },
    alternates: {
      canonical,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}