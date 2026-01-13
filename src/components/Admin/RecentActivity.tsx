export default function RecentActivity() {
  // Mock recent activity data - in a real app, this would come from the database
  const activities = [
    { id: 1, user: 'Admin User', action: 'Updated project', target: 'Modern Villa', time: '2 hours ago' },
    { id: 2, user: 'Admin User', action: 'Added new team member', target: 'Robert Johnson', time: '1 day ago' },
    { id: 3, user: 'Admin User', action: 'Published blog post', target: 'Sustainable Architecture Trends', time: '2 days ago' },
    { id: 4, user: 'Admin User', action: 'Received contact form', target: 'New project inquiry', time: '3 days ago' },
  ];

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-stone-200">
        <h3 className="text-lg leading-6 font-medium text-stone-900">Recent Activity</h3>
        <p className="mt-1 text-sm text-stone-500">Latest updates to your website content</p>
      </div>
      <ul className="divide-y divide-stone-200">
        {activities.map((activity) => (
          <li key={activity.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <span className="text-amber-800 font-medium">
                  {activity.user.charAt(0)}
                </span>
              </div>
              <div className="ml-4 flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 truncate">
                  {activity.user} <span className="font-normal text-stone-500">{activity.action}</span>
                </p>
                <p className="text-sm text-stone-500 truncate">{activity.target}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <span className="text-xs font-medium text-stone-500">{activity.time}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}