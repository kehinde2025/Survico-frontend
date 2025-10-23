import { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; // ✅ adjust path
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { updateEmail, updatePassword } from "firebase/auth";

export default function Settings() {
  const [admin, setAdmin] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [darkMode, setDarkMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      window.location.href = "/login";
      return;
    }

    // 🔥 Real-time updates for admin profile
    const unsub = onSnapshot(doc(db, "admins", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setAdmin(data);
        setForm({
          name: data.name || "",
          email: data.email || "",
          password: "",
        });
      } else {
        console.warn("No admin profile found!");
      }
    });

    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!admin) return;
    setSaving(true);

    try {
      const user = auth.currentUser;

      // ✅ Update Firestore profile
      const adminRef = doc(db, "admins", user.uid);
      await updateDoc(adminRef, {
        name: form.name,
        email: form.email,
        updatedAt: new Date(),
      });

      // ✅ Optionally update Firebase Auth email
      if (form.email !== user.email) {
        await updateEmail(user, form.email);
      }

      // ✅ Update password if entered
      if (form.password.trim()) {
        await updatePassword(user, form.password);
      }

      alert("✅ Settings updated successfully!");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (error) {
      console.error("Error updating settings:", error);
      alert("❌ Failed to update settings: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!admin)
    return (
      <div className="p-6 text-center text-gray-600">Loading admin settings...</div>
    );

  return (
    <div className={`p-6 max-w-2xl mx-auto ${darkMode ? "bg-gray-900 text-white" : ""}`}>
      <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>

      <form
        onSubmit={handleSave}
        className="bg-white dark:bg-gray-800 shadow p-6 rounded space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded text-gray-800"
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
            className="w-full border px-3 py-2 rounded text-gray-800"
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
            className="w-full border px-3 py-2 rounded text-gray-800"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={handleLogout}
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </form>

      <div className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        <p>
          <strong>Current Role:</strong> {admin.role?.toUpperCase() || "ADMIN"}
        </p>
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
