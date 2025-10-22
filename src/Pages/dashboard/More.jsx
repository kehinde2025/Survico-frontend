import { Link } from 'react-router-dom';

export default function More() {
  return (
    <div className="max-w-md mx-auto space-y-4 p-4">
      <h2 className="text-xl font-bold text-center text-blue-700">⚙️ More</h2>

      <div className="space-y-3">
        <Link to="/dashboard/profile" className="block bg-white rounded shadow px-4 py-3 hover:bg-blue-50">
          👤 Profile
        </Link>
        <Link to="/dashboard/withdrawal" className="block bg-white rounded shadow px-4 py-3 hover:bg-blue-50">
          💸 Withdrawal
        </Link>
        <Link to="/dashboard/referral" className="block bg-white rounded shadow px-4 py-3 hover:bg-blue-50">
          👥 Referral
        </Link>
        <Link to="/dashboard/leaderboard" className="block bg-white rounded shadow px-4 py-3 hover:bg-blue-50">
          🏆 Leaderboard
        </Link>
          <Link to="/dashboard/support" className="block bg-white p-4 rounded shadow hover:bg-gray-50">
         💬 Support Chat
        </Link>
        <button
          onClick={() => {
            // TODO: Handle logout logic
            localStorage.clear();
            window.location.href = '/login';
          }}
          className="w-full bg-red-600 text-white rounded px-4 py-3 hover:bg-red-700"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
