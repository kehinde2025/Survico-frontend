import { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", reward: "", link: "" });
  const [user, setUser] = useState(null);

  // 🧠 Load user info & start real-time Firestore listener
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    setUser(savedUser);

    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(data);
    });

    return () => unsubscribe(); // clean up on unmount
  }, []);

  // 🧾 Add new task (Admins only)
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.reward)
      return alert("Please fill all fields.");

    await addDoc(collection(db, "tasks"), {
      title: newTask.title,
      reward: Number(newTask.reward),
      link: newTask.link || "",
      createdBy: user?.uid,
      createdAt: serverTimestamp(),
    });

    setNewTask({ title: "", reward: "", link: "" });
  };

  // 🗑️ Delete task (Admin only)
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      await deleteDoc(doc(db, "tasks", id));
    }
  };

  return (
    <div className="p-6">
      <h1 className="flex text-2xl justify-center text-white font-bold mb-6">
        🔥 All Tasks
      </h1>

      {/* 👑 Admin: Create New Task */}
      {user?.role === "admin" && (
        <form
          onSubmit={handleAddTask}
          className="mb-6 p-4 border rounded bg-gray-50 space-y-3"
        >
          <h2 className="font-semibold text-lg">Create New Task</h2>
          <input
            type="text"
            placeholder="Task Title"
            className="w-full border p-2 rounded"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Reward (₦)"
            className="w-full border p-2 rounded"
            value={newTask.reward}
            onChange={(e) => setNewTask({ ...newTask, reward: e.target.value })}
          />
          <input
            type="url"
            placeholder="Task Link (optional)"
            className="w-full border p-2 rounded"
            value={newTask.link}
            onChange={(e) => setNewTask({ ...newTask, link: e.target.value })}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Task
          </button>
        </form>
      )}

      {/* 🧾 Tasks List */}
      {tasks.length === 0 ? (
        <p className="text-gray-400">No tasks available yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded shadow-sm flex justify-between items-center bg-white"
            >
              <div>
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-gray-600">Reward: ₦{task.reward}</p>
                {task.link && (
                  <a
                    href={task.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm"
                  >
                    Open Task
                  </a>
                )}
              </div>

              {user?.role === "admin" && (
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
