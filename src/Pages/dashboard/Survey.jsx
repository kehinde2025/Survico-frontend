// src/pages/dashboard/Surveys.jsx
import { useEffect, useState } from "react";
import API_BASE_URL from "../../config"; // 👈 use config.js

export default function Surveys() {



  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId") || "guest";

  useEffect(() => {
    async function fetchProviders() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/surveys?userId=${userId}`);
        const data = await res.json();
        setProviders(data);
      } catch (err) {
        console.error("Error loading surveys:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProviders();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading surveys...</p>;
  }

  if (providers.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No survey providers available right now.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        📝 Survey Providers
      </h1>

      {/* Provider Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {providers.map((p) => (
          <div
            key={p.id || p.key} // ✅ support both formats
            className="relative bg-gray-800 p-6 rounded-lg shadow-md text-center hover:shadow-lg hover:bg-gray-700 transition cursor-pointer"
            onClick={() => window.open(p.link, "_blank")}
          >
            {/* Badge */}
            {p.badge && (
              <span
                className={`absolute top-2 left-2 text-xs px-2 py-1 rounded font-bold ${
                  p.badge === "BEST"
                    ? "bg-green-500 text-white"
                    : "bg-purple-500 text-white"
                }`}
              >
                {p.badge}
              </span>
            )}

            {/* Logo fallback */}
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-600 rounded-full">
              {p.logo ? (
                <img src={p.logo} alt={p.name} className="h-10 object-contain" />
              ) : (
                <span className="text-white text-lg font-bold">{p.name[0]}</span>
              )}
            </div>

            <h2 className="text-lg font-semibold text-white">{p.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
