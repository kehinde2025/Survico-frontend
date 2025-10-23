import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'; // ✅ adjust the path if needed

export default function ReferralViews() {
  const [filter, setFilter] = useState('all');
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for real-time updates
    const unsubscribe = onSnapshot(
      collection(db, 'referrals'),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReferrals(list);
        setLoading(false);
      },
      (error) => {
        console.error('❌ Failed to load referrals:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const filtered = referrals.filter((ref) => {
    if (filter === 'active') return ref.active;
    if (filter === 'inactive') return !ref.active;
    if (filter === 'top') return (ref.referred || 0) >= 10;
    return true;
  });

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading referrals...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Referral Activity</h1>

      {/* Filter buttons */}
      <div className="flex gap-3 mb-4 text-sm">
        {['all', 'active', 'inactive', 'top'].map((status) => (
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

      {/* Referral Table */}
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
            {filtered.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name || 'Unnamed'}</td>
                <td className="p-3">{user.email || '-'}</td>
                <td className="p-3">{user.referred || 0}</td>
                <td className="p-3">₦{user.earnings || 0}</td>
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
          <p className="text-center text-gray-500 mt-4">
            No referrals found for this filter.
          </p>
        )}
      </div>
    </div>
  );
}
