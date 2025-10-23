import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // adjust if needed

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Only include normal users
        const filtered = data.filter((u) => u.role === 'user');

        setUsers(filtered);
      } catch (err) {
        console.error('🔥 Failed to fetch leaderboard:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  const sortedUsers = [...users].sort((a, b) => (b.points || 0) - (a.points || 0));

  if (loading) {
    return <div className="p-6 text-gray-500 text-center">Loading leaderboard...</div>;
  }

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
              <td className="px-4 py-2">{user.name || 'Unnamed'}</td>
              <td className="px-4 py-2">{user.email || 'No email'}</td>
              <td className="px-4 py-2 font-bold text-blue-700">{user.points || 0}</td>
              <td className="px-4 py-2 text-green-600 font-semibold">
                ${user.earnings ? user.earnings.toFixed(2) : '0.00'}
              </td>
              <td className="px-4 py-2">{user.tasks || 0}</td>
              <td className="px-4 py-2">{user.referrals || 0}</td>
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
