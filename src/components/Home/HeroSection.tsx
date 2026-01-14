'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-primary-light-brown overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-gradient-to-r from-primary-light-brown to-primary-orange-brown rounded-full opacity-30 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left slide-up">
              <h1 className="text-4xl tracking-tight font-extrabold text-primary-deep-brown sm:text-5xl md:text-6xl">
                <span className="block">Designing, Creating and Building</span>
                <span className="block text-primary-dark-brown mt-2">Tomorrow's Architecture Today</span>
              </h1>
              <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                We design, create and build innovative architectural, construction and civil engineering solutions that blend aesthetics with functionality,
                creating spaces that inspire and endure. Our team brings decades of experience in
                residential, commercial, and urban planning projects.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-dark-brown hover:bg-primary-deep-brown md:py-4 md:text-lg md:px-10 hover-lift"
                  >
                    Get in Touch
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/projects"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-dark-brown bg-white hover:bg-primary-light-brown md:py-4 md:text-lg md:px-10 hover-lift"
                  >
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-stone-200 sm:h-72 md:h-96 lg:w-full lg:h-full">
          <Image
            className="w-full h-full object-cover"
            src="/hero-image.jpg"
            alt="Modern architectural design"
            width={800}
            height={600}
            priority
          />
        </div>
      </div>
    </section>
  );
}