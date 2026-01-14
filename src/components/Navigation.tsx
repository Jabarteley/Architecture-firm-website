'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAdmin, signOut } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img src="/logo.svg" alt="Mohh-Musty Logo" className="h-10 w-10 mr-2" />
              <span className="text-2xl font-bold text-primary-dark-brown hidden sm:block">Mohh-Musty</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? 'border-b-2 border-primary-dark-brown text-primary-dark-brown'
                      : 'text-gray-700 hover:text-primary-dark-brown hover:border-b-2 hover:border-primary-dark-brown'
                  } inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium capitalize`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center">
            {isAdmin && (
              <div className="flex items-center space-x-4">
                <Link
                  href="/admin/dashboard"
                  className="text-gray-700 hover:text-primary-dark-brown text-sm font-medium"
                >
                  Admin Panel
                </Link>
                <button
                  onClick={handleSignOut}
                  className="ml-4 text-sm font-medium text-gray-700 hover:text-primary-dark-brown"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-dark-brown hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark-brown"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? 'bg-primary-light-brown border-primary-dark-brown text-primary-dark-brown'
                    : 'border-transparent text-gray-700 hover:bg-stone-50 hover:border-stone-300'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium capitalize`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 pb-3 border-t border-stone-200">
              {isAdmin && (
                <div className="flex flex-col space-y-2 px-4">
                  <Link
                    href="/admin/dashboard"
                    className="text-gray-700 hover:text-primary-dark-brown text-base font-medium"
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="text-left text-gray-700 hover:text-primary-dark-brown text-base font-medium"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;