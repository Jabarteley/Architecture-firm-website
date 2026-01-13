'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { signOut } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard' },
    { name: 'Projects', href: '/admin/projects' },
    { name: 'Services', href: '/admin/services' },
    { name: 'Team', href: '/admin/team' },
    { name: 'Gallery', href: '/admin/gallery' },
    { name: 'Blog', href: '/admin/blog' },
    { name: 'Contact Submissions', href: '/admin/contact-submissions' },
    { name: 'Site Settings', href: '/admin/settings' },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-stone-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-stone-800">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <span className="text-2xl font-bold text-amber-500">Admin</span>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`${
                      pathname === item.href
                        ? 'bg-stone-900 text-amber-500'
                        : 'text-stone-300 hover:bg-stone-700 hover:text-amber-500'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-stone-700 p-4">
              <button
                onClick={handleSignOut}
                className="flex-shrink-0 w-full group block"
              >
                <div className="flex items-center">
                  <div>
                    <span className="inline-block h-9 w-9 rounded-full bg-stone-200 flex items-center justify-center">
                      <span className="text-stone-800 font-medium">AU</span>
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-stone-100">Sign out</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-stone-800">
          <div className="flex flex-col h-0 flex-1 pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-bold text-amber-500">Admin Panel</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    pathname === item.href
                      ? 'bg-stone-900 text-amber-500'
                      : 'text-stone-300 hover:bg-stone-700 hover:text-amber-500'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-stone-700 p-4">
            <button
              onClick={handleSignOut}
              className="flex-shrink-0 w-full group block"
            >
              <div className="flex items-center">
                <div>
                  <span className="inline-block h-9 w-9 rounded-full bg-stone-200 flex items-center justify-center">
                    <span className="text-stone-800 font-medium">AU</span>
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-stone-100">Sign out</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;