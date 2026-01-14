import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have a project in mind? Reach out to our team of architectural experts. Contact us for inquiries about our services and projects. Address: No 30 Avenue 5 Equity Estate, Behind Ilorin West Local Government Secretariat Warah Road, Ilorin, Kwara State. Phone: +234 806 165 991. Email: mukaram907@gmail.com',
  keywords: ['contact architecture firm', 'get in touch', 'architectural services', 'project inquiry', 'contact form', 'Mohh-Musty contact', 'address', 'phone', 'email'],
  openGraph: {
    title: 'Contact Us | Mohh-Musty',
    description: 'Have a project in mind? Reach out to our team of architectural experts. Contact us for inquiries about our services and projects. Address: No 30 Avenue 5 Equity Estate, Behind Ilorin West Local Government Secretariat Warah Road, Ilorin, Kwara State. Phone: +234 806 165 991. Email: mukaram907@gmail.com',
    type: 'website',
    images: [
      {
        url: '/og-image-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Mohh-Musty',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Mohh-Musty',
    description: 'Have a project in mind? Reach out to our team of architectural experts. Contact us for inquiries about our services and projects. Address: No 30 Avenue 5 Equity Estate, Behind Ilorin West Local Government Secretariat Warah Road, Ilorin, Kwara State. Phone: +234 806 165 991. Email: mukaram907@gmail.com',
    images: ['/og-image-contact.jpg'],
  },
  alternates: {
    canonical: 'https://www.architecturefirm.com/contact',
  },
};