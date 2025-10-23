// src/pages/admin/DashboardHome.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // adjust the path if needed

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completed: 0,
    uncompleted: 0,
    remaining: 0,
    userEarnings: 0,
    companyEarnings: 0,
    totalUsers: 0,
    activeUsers: 0,
    oldUsers: 0,
    suspended: 0,
    blocked: 0,
  });

  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 🧩 Fetch all users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const users = usersSnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));

        // 🧮 Compute stats
        const totalUsers = users.length;
        const activeUsers = users.filter((u) => u.status === 'active').length;
        const suspended = users.filter((u) => u.status === 'suspended').length;
        const blocked = users.filter((u) => u.status === 'blocked').length;

        // Example: old users = created more than 30 days ago
        const oldUsers = users.filter((u) => {
          if (!u.createdAt) return false;
          const createdAt = u.createdAt.toDate ? u.createdAt.toDate() : new Date(u.createdAt);
          const daysOld = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
          return daysOld > 30;
        }).length;

        // 🪙 Calculate total user earnings
        const userEarnings = users.reduce((sum, u) => sum + (u.earnings || 0), 0);

        // 🏢 Example: company earnings = 20% of user earnings
        const companyEarnings = userEarnings * 0.2;

        // 🏆 Leaderboard: top 5 users by points
        const topUsers = [...users]
          .filter((u) => u.role === 'user')
          .sort((a, b) => (b.points || 0) - (a.points || 0))
          .slice(0, 5);

        // You can also fetch surveys or tasks from other collections if needed
        const totalTasks = 350; // static placeholder for now
        const completed = 290;
        const uncompleted = 40;
        const remaining = 20;

        setStats({
          totalTasks,
          completed,
          uncompleted,
          remaining,
          userEarnings,
          companyEarnings,
          totalUsers,
          activeUsers,
          oldUsers,
          suspended,
          blocked,
        });

        setTopUsers(topUsers);
      } catch (err) {
        console.error('❌ Failed to fetch dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const sortedUsers = [...topUsers].sort((a, b) => (b.points || 0) - (a.points || 0));

  if (loading) {
    return <div className="p-6 text-gray-500 text-center">Loading dashboard...</div>;
  }

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
          ['User Earnings ($)', `$${stats.userEarnings.toFixed(2)}`],
          ['Company Earnings ($)', `$${stats.companyEarnings.toFixed(2)}`],
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

      {/* Top Leaderboard */}
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
              <tr key={user.id} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td>{user.name || 'Unnamed'}</td>
                <td className="font-semibold text-blue-700">{user.points || 0}</td>
                <td className="text-green-600 font-semibold">
                  ${user.earnings ? user.earnings.toFixed(2) : '0.00'}
                </td>
              </tr>
            ))}
            {sortedUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
