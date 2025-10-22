import { useState } from "react";

export default function Settings() {
  const [admin, setAdmin] = useState({
    name: "Admin Isaac",
    email: "admin@survico.com",
    role: "admin",
  });

  const [form, setForm] = useState({
    name: admin.name,
    email: admin.email,
    password: "",
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setAdmin({ ...admin, name: form.name, email: form.email });
    alert("Settings updated (pending server save)");
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <form onSubmit={handleSave} className="bg-white shadow p-6 rounded space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">New Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
             onClick={() => {
            // TODO: Handle logout logic
            localStorage.clear();
            window.location.href = '/login';
          }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-600">
        <p><strong>Current Role:</strong> {admin.role.toUpperCase()}</p>
        <label className="inline-flex items-center mt-4">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox"
          />
          <span className="ml-2">Enable Dark Mode</span>
        </label>
      </div>
    </div>
  );
}
