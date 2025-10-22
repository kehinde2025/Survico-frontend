import { useState } from 'react';

export default function Withdrawals() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      amount: 5000,
      method: 'Bank Transfer',
      status: 'pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      amount: 3000,
      method: 'USDT',
      status: 'approved',
    },
    {
      id: 3,
      name: 'Tim Johnson',
      email: 'tim@example.com',
      amount: 2000,
      method: 'Bank Transfer',
      status: 'rejected',
    },
  ]);

  const [filter, setFilter] = useState('all');

  const handleUpdateStatus = (id, newStatus) => {
    setRequests(prev =>
      prev.map(r => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const filteredRequests =
    filter === 'all'
      ? requests
      : requests.filter(request => request.status === filter);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Withdrawal Requests</h1>

      {/* 🔍 Filter Tabs */}
      <div className="flex gap-3 mb-4 text-sm">
        {['all', 'pending', 'approved', 'rejected'].map(status => (
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

      {/* 🧾 Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded border">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredRequests.map(request => (
              <tr key={request.id} className="border-b">
                <td className="p-3">{request.name}</td>
                <td className="p-3">{request.email}</td>
                <td className="p-3">₦{request.amount}</td>
                <td className="p-3">{request.method}</td>
                <td className="p-3 capitalize">
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      request.status === 'approved'
                        ? 'bg-green-600'
                        : request.status === 'rejected'
                        ? 'bg-red-600'
                        : 'bg-yellow-500'
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  {request.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'approved')}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'rejected')}
                        className="px-3 py-1 bg-red-600 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 italic">Action taken</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <p className="mt-4 text-gray-500 text-center">No {filter} requests found.</p>
        )}
      </div>
    </div>
  );
}
