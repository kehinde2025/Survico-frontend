import { useEffect, useState } from 'react';
import api from '../../utils/axios'; // Adjust your API path if needed

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        // Replace with your real backend route
        const res = await api.get('/admin/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        // Fallback dummy data
        setUsers([
          {
            id: 1,
            name: 'Isaac',
            email: 'isaac@example.com',
            tasks: 14,
            points: 240,
            earnings: 48,
            referrals: 5,
          },
          {
            id: 2,
            name: 'Jane Doe',
            email: 'jane@example.com',
            tasks: 12,
            points: 200,
            earnings: 40,
            referrals: 3,
          },
          {
            id: 3,
            name: 'John Smith',
            email: 'john@example.com',
            tasks: 10,
            points: 180,
            earnings: 36,
            referrals: 2,
          },
        ]);
      }
    }

    fetchLeaderboard();
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.points - a.points);

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
      <h3 className="text-xl font-bold mb-4 text-gray-800">🏆 Leaderboard</h3>

      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-sm">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Points</th>
            <th className="px-4 py-2">Earnings ($)</th>
            <th className="px-4 py-2">Tasks</th>
            <th className="px-4 py-2">Referrals</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 font-bold text-blue-700">{user.points}</td>
              <td className="px-4 py-2 text-green-600 font-semibold">${user.earnings.toFixed(2)}</td>
              <td className="px-4 py-2">{user.tasks}</td>
              <td className="px-4 py-2">{user.referrals}</td>
            </tr>
          ))}
          {sortedUsers.length === 0 && (
            <tr>
              <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
