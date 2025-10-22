// src/Pages/dashboard/Profile.jsx
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
  }, []);

  if (!user) return <p className="text-white p-4">Loading profile...</p>;

  const profileFields = [
    { label: 'Name', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Phone', value: user.phone },
    { label: 'Gender', value: user.gender },
    { label: 'Age', value: user.age },
    { label: 'Country', value: user.country },
    { label: 'State', value: user.state },
    { label: 'Role', value: user.role },
  ];

  return (
    <div className="bg-[#140932] min-h-screen text-white p-6">
      <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

      <div className="bg-[#201547] rounded-lg shadow p-4 space-y-4">
        {profileFields.map((field) => (
          <div key={field.label} className="flex justify-between items-center border-b border-gray-700 pb-2">
            <span className="font-medium">{field.label}</span>
            <span className="text-right text-gray-300">{field.value || 'N/A'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
