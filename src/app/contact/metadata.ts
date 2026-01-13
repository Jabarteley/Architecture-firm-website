import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a project in mind? Reach out to our team of architectural experts. Contact us for inquiries about our services and projects.',
  keywords: ['contact architecture firm', 'get in touch', 'architectural services', 'project inquiry', 'contact form'],
  openGraph: {
    title: 'Contact Us | Architecture Firm',
    description: 'Have a project in mind? Reach out to our team of architectural experts. Contact us for inquiries about our services and projects.',
    type: 'website',
    images: [
      {
        url: '/og-image-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Architecture Firm',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Architecture Firm',
    description: 'Have a project in mind? Reach out to our team of architectural experts. Contact us for inquiries about our services and projects.',
    images: ['/og-image-contact.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com/contact',
  },
};