import { useEffect, useState } from 'react';

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalTasks: 350,
    completed: 290,
    uncompleted: 40,
    remaining: 20,
    userEarnings: 14500,
    companyEarnings: 5500,
    totalUsers: 1000,
    activeUsers: 780,
    oldUsers: 220,
    suspended: 15,
    blocked: 5
  });

  const [topUsers, setTopUsers] = useState([
    { name: 'Isaac', earnings: 1200, points: 240 },
    { name: 'Ada', earnings: 1050, points: 220 },
    { name: 'John', earnings: 980, points: 210 },
    { name: 'Fatima', earnings: 920, points: 190 },
    { name: 'Chinedu', earnings: 850, points: 180 },
  ]);

  useEffect(() => {
    // TODO: Replace with real backend call
    // Example:
    // api.get('/admin/leaderboard').then(res => setTopUsers(res.data));
  }, []);

  // Sort by points descending
  const sortedUsers = [...topUsers].sort((a, b) => b.points - a.points);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📊 Admin Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Total Tasks', stats.totalTasks],
          ['Completed Tasks', stats.completed],
          ['Uncompleted Tasks', stats.uncompleted],
          ['Remaining Tasks', stats.remaining],
          ['User Earnings ($)', `$${stats.userEarnings}`],
          ['Company Earnings ($)', `$${stats.companyEarnings}`],
          ['Total Users', stats.totalUsers],
          ['Active Users', stats.activeUsers],
          ['Old Users', stats.oldUsers],
          ['Suspended Users', stats.suspended],
          ['Blocked Users', stats.blocked],
        ].map(([label, value], i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
            <h3 className="text-sm text-gray-500">{label}</h3>
            <p className="text-xl font-bold text-blue-700">{value}</p>
          </div>
        ))}
      </div>

      {/* Top Leaderboard with Points */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">🏆 Top Users (Points)</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="py-2">#</th>
              <th>Name</th>
              <th>Points</th>
              <th>Earnings ($)</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={user.name} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td>{user.name}</td>
                <td className="font-semibold text-blue-700">{user.points}</td>
                <td className="text-green-600 font-semibold">${user.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
