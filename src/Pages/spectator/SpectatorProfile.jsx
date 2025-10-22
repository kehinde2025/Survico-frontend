// src/Pages/inspector/InspectorProfile.jsx
import { useState } from 'react';

export default function SpectatorProfile() {
  // Dummy spectator profile info
  const [spectator, setSpectator] = useState({
    name: 'Spectator Joe',
    email: 'spectator@gmail.com',
    status: 'Active',
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">👤 Inspector Profile</h2>

      <div className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm text-gray-500">Name</label>
          <p className="text-lg font-medium">{spectator.name}</p>
        </div>

        <div>
          <label className="block text-sm text-gray-500">Email</label>
          <p className="text-lg font-medium">{spectator.email}</p>
        </div>

        <div>
          <label className="block text-sm text-gray-500">Status</label>
          <p className={`text-lg font-medium ${spectator.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
            {spectator.status}
          </p>
        </div>
      </div>
    </div>
  );
}
