import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-primary-dark-brown">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          <span className="block">Ready to start your project?</span>
          <span className="block text-primary-light-brown">Contact us today for a consultation.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-dark-brown bg-white hover:bg-primary-light-brown"
            >
              Get in touch
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-deep-brown hover:bg-primary-dark-brown"
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}