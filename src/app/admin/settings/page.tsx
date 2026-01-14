'use client';

import { useState, useEffect } from 'react';
import { supabaseUtils, SiteSettings } from '@/utils/supabase-utils';
import ProtectedRoute from '@/components/ProtectedRoute';
import MediaLibrary from '@/components/Admin/MediaLibrary';

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [mediaField, setMediaField] = useState<'logo_url' | 'favicon_url' | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await supabaseUtils.getSiteSettings();
      setSettings(data);
    } catch (err) {
      setError('Failed to load site settings');
      console.error('Error loading site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setSettings(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleToggleMaintenance = () => {
    setSettings(prev => prev ? { ...prev, maintenance_mode: !prev.maintenance_mode } : null);
  };

  const handleSelectImage = (url: string) => {
    if (settings && mediaField) {
      setSettings({ ...settings, [mediaField]: url });
    }
    setShowMediaLibrary(false);
    setMediaField(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!settings) return;
    
    setIsSubmitting(true);
    try {
      await supabaseUtils.updateSiteSettings(settings);
      // Optionally show a success message
    } catch (err) {
      setError('Failed to save site settings');
      console.error('Error saving site settings:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute adminOnly={true}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!settings) {
    return (
      <ProtectedRoute adminOnly={true}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-stone-900">No site settings found</h3>
            <p className="mt-1 text-stone-600">Please check your database configuration.</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-stone-900">Site Settings</h1>
          <p className="mt-2 text-stone-600">Manage your website's global settings</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
            <h3 className="text-lg leading-6 font-medium text-stone-900">General Settings</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="site_title" className="block text-sm font-medium text-stone-700">
                  Site Title
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="site_title"
                    id="site_title"
                    value={settings.site_title}
                    onChange={handleChange}
                    className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="site_description" className="block text-sm font-medium text-stone-700">
                  Site Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="site_description"
                    name="site_description"
                    rows={3}
                    value={settings.site_description}
                    onChange={handleChange}
                    className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="contact_email" className="block text-sm font-medium text-stone-700">
                  Contact Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="contact_email"
                    id="contact_email"
                    value={settings.contact_email}
                    onChange={handleChange}
                    className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="contact_phone" className="block text-sm font-medium text-stone-700">
                  Contact Phone
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    name="contact_phone"
                    id="contact_phone"
                    value={settings.contact_phone}
                    onChange={handleChange}
                    className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="office_address" className="block text-sm font-medium text-stone-700">
                  Office Address
                </label>
                <div className="mt-1">
                  <textarea
                    id="office_address"
                    name="office_address"
                    rows={2}
                    value={settings.office_address}
                    onChange={handleChange}
                    className="block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-stone-700">
                  Logo
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {settings.logo_url && (
                    <div className="flex-shrink-0">
                      <img 
                        src={settings.logo_url} 
                        alt="Logo preview" 
                        className="h-16 w-16 rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setMediaField('logo_url');
                        setShowMediaLibrary(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      {settings.logo_url ? 'Change Logo' : 'Select Logo'}
                    </button>
                    {settings.logo_url && (
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, logo_url: '' })}
                        className="ml-2 inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-stone-700">
                  Favicon
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  {settings.favicon_url && (
                    <div className="flex-shrink-0">
                      <img 
                        src={settings.favicon_url} 
                        alt="Favicon preview" 
                        className="h-8 w-8 rounded-md object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setMediaField('favicon_url');
                        setShowMediaLibrary(true);
                      }}
                      className="inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                    >
                      {settings.favicon_url ? 'Change Favicon' : 'Select Favicon'}
                    </button>
                    {settings.favicon_url && (
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, favicon_url: '' })}
                        className="ml-2 inline-flex items-center px-4 py-2 border border-stone-300 text-sm font-medium rounded-md shadow-sm text-stone-700 bg-white hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-stone-700">
                  Social Media Links
                </label>
                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
                    <div key={platform}>
                      <label htmlFor={`social_${platform}`} className="block text-xs font-medium text-stone-500 uppercase">
                        {platform}
                      </label>
                      <input
                        type="text"
                        name={`social_${platform}`}
                        id={`social_${platform}`}
                        value={settings.social_links[platform] || ''}
                        onChange={(e) => {
                          setSettings({
                            ...settings,
                            social_links: {
                              ...settings.social_links,
                              [platform]: e.target.value
                            }
                          });
                        }}
                        placeholder={`https://${platform}.com/youraccount`}
                        className="mt-1 block w-full shadow-sm focus:ring-amber-500 focus:border-amber-500 sm:text-sm border-stone-300 rounded-md text-stone-900"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-6">
                <div className="flex items-center">
                  <input
                    id="maintenance_mode"
                    name="maintenance_mode"
                    type="checkbox"
                    checked={settings.maintenance_mode}
                    onChange={handleToggleMaintenance}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-stone-300 rounded"
                  />
                  <label htmlFor="maintenance_mode" className="ml-2 block text-sm text-stone-900">
                    Maintenance Mode
                  </label>
                </div>
                <p className="mt-1 text-sm text-stone-500">
                  When enabled, visitors will see a maintenance message instead of the website content.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </div>
        </form>
        
        {showMediaLibrary && (
          <MediaLibrary 
            onImageSelect={handleSelectImage}
            onClose={() => setShowMediaLibrary(false)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}