'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';

// Define the structure of an activity item
interface Activity {
  id: string;
  type: string;
  action: string;
  target: string;
  created_at: string;
}

// A mapping to render icons based on activity type
const activityIcons: { [key: string]: string } = {
  Project: 'P',
  'Team Member': 'T',
  'Blog Post': 'B',
  'Contact Form': 'C',
};

// Helper to format new realtime payloads into our Activity structure
const formatRealtimePayload = (payload: any): Activity | null => {
  const { table, new: newRecord } = payload;
  if (!newRecord) return null;

  switch (table) {
    case 'projects':
      return { id: newRecord.id, type: 'Project', action: 'created', target: newRecord.title, created_at: newRecord.created_at };
    case 'team_members':
      return { id: newRecord.id, type: 'Team Member', action: 'added', target: newRecord.name, created_at: newRecord.created_at };
    case 'blog_posts':
      if (newRecord.published) {
        return { id: newRecord.id, type: 'Blog Post', action: 'published', target: newRecord.title, created_at: newRecord.published_at };
      }
      return null;
    case 'contact_submissions':
      return { id: newRecord.id, type: 'Contact Form', action: 'received from', target: newRecord.name, created_at: newRecord.created_at };
    default:
      return null;
  }
};

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    const fetchInitialActivities = async () => {
      try {
        const { data, error } = await supabase.rpc('get_recent_activities', { limit_count: 5 });
        if (error) throw error;
        if (data) {
          setActivities(data);
        }
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialActivities();

    // Set up realtime subscriptions
    // Make sure you have enabled Realtime for these tables in your Supabase project settings
    const channel = supabase
      .channel('public-activity-feed')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'projects' },
        (payload) => {
          const newActivity = formatRealtimePayload(payload);
          if (newActivity) {
            setActivities((prev) => [newActivity, ...prev]);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'team_members' },
        (payload) => {
          const newActivity = formatRealtimePayload(payload);
          if (newActivity) {
            setActivities((prev) => [newActivity, ...prev]);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'blog_posts' },
        (payload) => {
          const newActivity = formatRealtimePayload(payload);
          if (newActivity) {
            setActivities((prev) => [newActivity, ...prev]);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'contact_submissions' },
        (payload) => {
          const newActivity = formatRealtimePayload(payload);
          if (newActivity) {
            setActivities((prev) => [newActivity, ...prev]);
          }
        }
      )
      .subscribe();

    // Clean up subscription on component unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
        <h3 className="text-lg leading-6 font-medium text-stone-900">Recent Activity</h3>
        <p className="mt-1 text-sm text-stone-500">Latest updates to your website content</p>
      </div>
      {loading ? (
        <div className="p-6 text-center text-stone-500">Loading activities...</div>
      ) : activities.length === 0 ? (
        <div className="p-6 text-center text-stone-500">No recent activity.</div>
      ) : (
        <ul className="divide-y divide-stone-200">
          {activities.slice(0, 10).map((activity) => (
            <li key={activity.id + activity.created_at} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="text-amber-800 font-medium">
                    {activityIcons[activity.type] || '?'}
                  </span>
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-900 truncate">
                    {activity.type} <span className="font-normal text-stone-500">{activity.action}</span>
                  </p>
                  <p className="text-sm text-stone-500 truncate">{activity.target}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span className="text-xs font-medium text-stone-500">
                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}