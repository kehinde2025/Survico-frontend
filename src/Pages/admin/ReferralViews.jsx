import { useState } from 'react';

export default function ReferralViews() {
  const [filter, setFilter] = useState('all');
  const referrals = [
    { id: 1, name: 'John Doe', email: 'john@example.com', referred: 10, earnings: 500, active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', referred: 4, earnings: 200, active: false },
    { id: 3, name: 'Tim Johnson', email: 'tim@example.com', referred: 18, earnings: 900, active: true },
    { id: 4, name: 'Sarah Lee', email: 'sarah@example.com', referred: 7, earnings: 350, active: true },
  ];

  const filtered = referrals.filter(ref => {
    if (filter === 'active') return ref.active;
    if (filter === 'inactive') return !ref.active;
    if (filter === 'top') return ref.referred >= 10;
    return true;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Referral Activity</h1>

      {/* Filter */}
      <div className="flex gap-3 mb-4 text-sm">
        {['all', 'active', 'inactive', 'top'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1 rounded ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded border">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Referred</th>
              <th className="p-3">Earnings</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filtered.map(user => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.referred}</td>
                <td className="p-3">₦{user.earnings}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      user.active ? 'bg-green-600' : 'bg-gray-500'
                    }`}
                  >
                    {user.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No referrals found for this filter.</p>
        )}
      </div>
    </div>
  );
}
