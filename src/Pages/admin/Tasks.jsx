import { useState, useEffect } from "react";
import { db, auth } from "../../firebase"; // ✅ adjust path if different
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    reward: "",
    link: "",
    category: "Survey",
  });
  const [loading, setLoading] = useState(false);

  // 🔥 Real-time listener for all tasks
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetched);
    });
    return () => unsubscribe();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new task to Firestore
  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("You must be logged in as an admin to add tasks.");
        return;
      }

      await addDoc(collection(db, "tasks"), {
        ...formData,
        reward: Number(formData.reward),
        createdAt: serverTimestamp(),
        createdBy: user.uid,
        status: "active",
      });

      setFormData({
        title: "",
        description: "",
        reward: "",
        link: "",
        category: "Survey",
      });

      alert("✅ Task added successfully!");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("❌ Failed to add task: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks Management</h1>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className="bg-white rounded shadow p-4 mb-6 space-y-4 max-w-lg"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="number"
          name="reward"
          value={formData.reward}
          onChange={handleChange}
          placeholder="Reward ($)"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="url"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Task Link (URL)"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="Survey">Survey</option>
          <option value="App">App</option>
          <option value="Offer">Offer</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "+ Add Task"}
        </button>
      </form>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks added yet.</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-bold">{task.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{task.description}</p>
              <p className="text-sm">
                <span className="font-semibold">Reward:</span> ${task.reward}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Link:</span>{" "}
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Visit Task
                </a>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Category:</span> {task.category}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
