import { useState } from 'react';

export default function Users() {
    const allUsers = [
        { id: 1, name: 'Isaac Okoro', email: 'isaac@example.com', joined: '2025-06-01', status: 'active' },
        { id: 2, name: 'Mary John', email: 'maryj@example.com', joined: '2025-05-21', status: 'suspended' },
        { id: 3, name: 'Chinedu Bright', email: 'chinedu@example.com', joined: '2025-04-15', status: 'blocked' },
        { id: 4, name: 'Ada Obi', email: 'ada@example.com', joined: '2025-04-22', status: 'active' },
        { id: 5, name: 'Jon Snow', email: 'jon@example.com', joined: '2025-03-18', status: 'active' },
        { id: 6, name: 'Amaka Okoro', email: 'amaka@example.com', joined: '2025-02-15', status: 'active' },
    ];

    const [users, setUsers] = useState(allUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;
    const [selectedUser, setSelectedUser] = useState(null); // For modal

    const handleStatusChange = (id, newStatus) => {
        const updated = users.map(user =>
            user.id === id ? { ...user, status: newStatus } : user
        );
        setUsers(updated);
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">All Users</h2>

            {/* 🔍 Search Bar */}
            <input
                type="text"
                placeholder="Search users..."
                className="mb-4 px-4 py-2 border rounded w-full max-w-md focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* 📊 Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded shadow">
                    <thead>
                        <tr className="bg-blue-100 text-left">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Joined</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id} className="border-t hover:bg-gray-50">
                                <td className="py-2 px-4">{user.name}</td>
                                <td className="py-2 px-4">{user.email}</td>
                                <td className="py-2 px-4">{user.joined}</td>
                                <td className="py-2 px-4 capitalize">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white ${user.status === 'active'
                                            ? 'bg-green-500'
                                            : user.status === 'suspended'
                                                ? 'bg-yellow-500'
                                                : 'bg-red-500'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-2 px-4 space-x-2">
                                    <button
                                        onClick={() => setSelectedUser(user)}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View
                                    </button>

                                    {user.status === 'active' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(user.id, 'suspended')}
                                                className="text-yellow-600 hover:underline text-sm"
                                            >
                                                Suspend
                                            </button>
                                            <button
                                                onClick={() => handleStatusChange(user.id, 'blocked')}
                                                className="text-red-600 hover:underline text-sm"
                                            >
                                                Block
                                            </button>
                                        </>
                                    )}

                                    {(user.status === 'suspended' || user.status === 'blocked') && (
                                        <button
                                            onClick={() => handleStatusChange(user.id, 'active')}
                                            className="text-green-600 hover:underline text-sm"
                                        >
                                            Activate
                                        </button>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 🔢 Pagination */}
            <div className="flex justify-center items-center mt-4 space-x-2">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* 👁️ View Details Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-bold mb-2">User Details</h3>
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Status:</strong> {selectedUser.status}</p>
                        <p><strong>Joined:</strong> {selectedUser.joined}</p>
                        <div className="text-right mt-4">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="text-red-500 hover:underline"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
