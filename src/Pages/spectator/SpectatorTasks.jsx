// src/Pages/inspector/InspectorTasks.jsx
import { useEffect, useState } from 'react';

export default function SpectatorTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Review Survey A', status: 'Pending' },
    { id: 2, name: 'Verify Withdrawal #102', status: 'Approved' },
    { id: 3, name: 'Check User Complaint', status: 'In Progress' },
  ]);

  // Optional: fetch real tasks with useEffect
  useEffect(() => {
    // TODO: fetch tasks for inspector
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📋 Inspector Tasks</h2>

      <div className="bg-white p-4 rounded shadow">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="border-b">
              <tr className="text-sm text-gray-600">
                <th className="py-2">#</th>
                <th>Task</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id} className="border-b">
                  <td className="py-2">{index + 1}</td>
                  <td>{task.name}</td>
                  <td className="font-medium">
                    {task.status === 'Approved' ? (
                      <span className="text-green-600">{task.status}</span>
                    ) : task.status === 'Pending' ? (
                      <span className="text-yellow-600">{task.status}</span>
                    ) : (
                      <span className="text-blue-600">{task.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
