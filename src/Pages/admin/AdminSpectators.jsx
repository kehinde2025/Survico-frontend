import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/axios'; // adjust your path

export default function AdminSpectators() {
  const [spectators, setSpectators] = useState([]);

  useEffect(() => {
    async function fetchSpectators() {
      try {
        const res = await api.get('/admin/spectators');
        setInspectors(res.data);
      } catch (err) {
        console.error('Failed to fetch spectators:', err);
        // Fallback dummy
        setInspectors([
          { id: 1, name: 'Spectator Joe', email: 'joe@example.com', status: 'active' },
          { id: 2, name: 'Spectator Mary', email: 'mary@example.com', status: 'suspended' },
        ]);
      }
    }

    fetchInspectors();
  }, []);

  async function toggleStatus(spectatorId, currentStatus) {
    try {
      const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
      await api.post(`/admin/spectators/${spectatorId}/status`, { status: newStatus });
      setSpectators((prev) =>
        prev.map((spec) =>
          spec.id === spectatorId ? { ...spec, status: newStatus } : spec
        )
      );
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Could not update status.');
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">🕵️ Spectators</h2>
        <Link
          to="/admin/spectators/add"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Spectator
        </Link>
      </div>

      <table className="min-w-full bg-white shadow rounded overflow-x-auto">
        <thead className="bg-gray-200 text-gray-700">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spectators.map((spectator, index) => (
            <tr key={inspector.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{inspector.name}</td>
              <td className="px-4 py-2">{inspector.email}</td>
              <td className="px-4 py-2 capitalize">{inspector.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => toggleStatus(inspector.id, inspector.status)}
                  className={`px-3 py-1 rounded text-xs ${
                    inspector.status === 'active'
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {inspector.status === 'active' ? 'Suspend' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
          {inspectors.length === 0 && (
            <tr>
              <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                No inspectors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
