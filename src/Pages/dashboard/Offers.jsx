// src/pages/dashboard/Offers.jsx
import { useEffect, useState } from "react";
import API_BASE_URL from "../../config"; // ✅ use config.js

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId") || "guest";

  useEffect(() => {
    async function fetchOffers() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/offers?userId=${userId}`);
        const data = await res.json();
        setOffers(data);
      } catch (err) {
        console.error("Error fetching offers:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOffers();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-400">Loading offers...</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        🎁 Offerwalls
      </h1>

      {offers.length === 0 ? (
        <p className="text-center text-gray-500">No offerwalls available.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {offers.map((offer) => (
            <a
              key={offer.id} // ✅ stick with offer.id
              href={offer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition"
            >
              {offer.logo && (
                <img
                  src={offer.logo}
                  alt={offer.name}
                  className="h-12 mx-auto mb-3"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-800">
                {offer.name}
              </h2>
              {offer.badge && (
                <span className="inline-block mt-2 text-xs font-bold bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {offer.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
