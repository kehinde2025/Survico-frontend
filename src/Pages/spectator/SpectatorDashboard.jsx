import { useEffect, useState } from 'react';

export default function SpectatorDashboard() {
  const [spectatorData, setSpectatorData] = useState({
    name: 'spectator Joe',
    tasksReviewed: 35,
    tasksPending: 5,
    totalPointsApproved: 200,
  });

  const [recentTasks, setRecentTasks] = useState([
    { id: 1, user: 'Isaac', survey: 'Customer Feedback', points: 2, status: 'Approved' },
    { id: 2, user: 'Ada', survey: 'Product Survey', points: 2, status: 'Pending' },
  ]);

  useEffect(() => {
    // ✅ Replace this with real backend later
    // Example: fetch(`/api/spectator/dashboard`)
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        👀 Welcome, {spectatorData.name}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-gray-500">Tasks Reviewed</h3>
          <p className="text-xl font-bold text-blue-700">{spectatorData.tasksReviewed}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-gray-500">Pending Reviews</h3>
          <p className="text-xl font-bold text-yellow-600">{spectatorData.tasksPending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-gray-500">Total Points Approved</h3>
          <p className="text-xl font-bold text-green-700">{spectatorData.totalPointsApproved}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          🗂️ Recent Tasks Reviewed
        </h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="py-2">#</th>
              <th>User</th>
              <th>Survey</th>
              <th>Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentTasks.map((task, index) => (
              <tr key={task.id} className="border-b">
                <td className="py-2">{index + 1}</td>
                <td>{task.user}</td>
                <td>{task.survey}</td>
                <td>{task.points}</td>
                <td
                  className={
                    task.status === 'Approved'
                      ? 'text-green-600'
                      : 'text-yellow-600'
                  }
                >
                  {task.status}
                </td>
              </tr>
            ))}
            {recentTasks.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No tasks yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
