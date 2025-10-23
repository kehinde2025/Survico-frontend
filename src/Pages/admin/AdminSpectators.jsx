// src/pages/AdminSpectators.jsx

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // adjust the path if needed

export default function AdminSpectators() {
  const [spectators, setSpectators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all spectators (or inspectors) from Firestore
  useEffect(() => {
    async function fetchSpectators() {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const users = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((u) => u.role === 'inspector' || u.role === 'spectator'); // choose your filter
        setSpectators(users);
      } catch (err) {
        console.error('❌ Failed to fetch spectators:', err);
        alert('Error fetching spectators.');
      } finally {
        setLoading(false);
      }
    }

    fetchSpectators();
  }, []);

  // Toggle active/suspended status
  async function toggleStatus(userId, currentStatus) {
    try {
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { status: newStatus });

      setSpectators((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, status: newStatus } : u
        )
      );
    } catch (err) {
      console.error('❌ Failed to update status:', err);
      alert('Could not update status.');
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading spectators...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🕵️ Inspectors</h2>
        <Link
          to="/admin/spectators/add"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Inspector
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {spectators.length > 0 ? (
              spectators.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize text-center">
                    {user.status || 'active'}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() =>
                        toggleStatus(user.id, user.status || 'active')
                      }
                      className={`px-3 py-1 rounded text-xs ${
                        (user.status || 'active') === 'active'
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {(user.status || 'active') === 'active'
                        ? 'Suspend'
                        : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No inspectors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
