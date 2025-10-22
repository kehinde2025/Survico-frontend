// pages/AddInspector.js

import { useState } from 'react';


export default function AddSpectators() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/spectators', form);
      setSuccess('✅ Spectator created!');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to create spectator.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add Inspector</h2>
      {success && (
        <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
          {success}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Inspector
        </button>
      </form>
    </div>
  );
}
