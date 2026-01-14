import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | DesignBuild Engineers',
    default: 'DesignBuild Engineers | Professional Architecture, Construction and Civil Engineering Services',
  },
  description: "Professional Architecture, Construction and Civil Engineering Services",
  keywords: ['architecture', 'construction', 'civil engineering', 'design', 'building', 'construction services', 'civil engineering projects'],
  authors: [{ name: 'DesignBuild Engineers' }],
  creator: 'DesignBuild Engineers',
  publisher: 'DesignBuild Engineers',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.designbuildengineers.com',
    siteName: 'DesignBuild Engineers',
    title: 'DesignBuild Engineers | Professional Architecture, Construction and Civil Engineering Services',
    description: "Professional Architecture, Construction and Civil Engineering Services",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DesignBuild Engineers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DesignBuild Engineers | Professional Architecture, Construction and Civil Engineering Services',
    description: "Professional Architecture, Construction and Civil Engineering Services",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.designbuildengineers.com',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
