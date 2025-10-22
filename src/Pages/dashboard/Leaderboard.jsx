import { useEffect, useState } from 'react';

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        // Dummy data — you can replace with real API data later
        fetch('/api/leaderboard')
            .then(res => res.json())
            .then(data => setLeaders(data));
    }, []);

    return (
        <div className="max-w-md mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">🏆 Leaderboard</h2>

            <div className="bg-white shadow rounded-lg overflow-hidden divide-y">
                {leaders.map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between px-4 py-3">
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-gray-700 w-6 text-center">
                                {index + 1}
                            </span>
                            <span className="font-medium text-gray-800">{user.name}</span>
                        </div>
                        <span className="text-blue-600 font-semibold">{user.points} pts</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
