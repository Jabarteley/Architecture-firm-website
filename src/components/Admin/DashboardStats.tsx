import Link from 'next/link';

export default function DashboardStats({
  projectsCount,
  teamMembersCount,
  blogPostsCount,
  contactSubmissionsCount
}: {
  projectsCount: number;
  teamMembersCount: number;
  blogPostsCount: number;
  contactSubmissionsCount: number;
}) {
  const stats = [
    { name: 'Projects', value: projectsCount, href: '/admin/projects', color: 'bg-amber-500' },
    { name: 'Team Members', value: teamMembersCount, href: '/admin/team', color: 'bg-stone-500' },
    { name: 'Blog Posts', value: blogPostsCount, href: '/admin/blog', color: 'bg-amber-700' },
    { name: 'Contact Submissions', value: contactSubmissionsCount, href: '/admin/contact-submissions', color: 'bg-stone-700' },
  ];

  return (
    <div>
      <h2 className="text-lg font-medium text-stone-900 mb-4">Website Statistics</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                  <svg
                    className="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-stone-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-stone-900">{stat.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}