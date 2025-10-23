import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // 🔥 Real-time listener for leaderboard
    const q = query(collection(db, "leaderboard"), orderBy("points", "desc"), limit(20));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLeaders(data);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        🏆 Leaderboard
      </h2>

      {leaders.length === 0 ? (
        <p className="text-center text-gray-500">No leaderboard data yet.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden divide-y">
          {leaders.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-gray-700 w-6 text-center">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
              <span className="text-blue-600 font-semibold">
                {user.points} pts
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
