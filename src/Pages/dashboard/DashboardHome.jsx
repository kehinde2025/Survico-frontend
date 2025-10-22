import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, RefreshCw, AlertCircle } from "lucide-react";
import { auth, db } from "../../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

export default function DashboardHome() {
  const [dashboardData, setDashboardData] = useState({
    user: {
      name: "Loading...",
      earnings: 0,
      tasksCompleted: 0,
      referrals: 0,
      points: 0,
    },
    topSurveys: [],
    topOffers: [],
  });

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // ✅ Fetch dashboard data from Firestore
  const fetchDashboardData = async () => {
    setLoading(true);
    setApiError(null);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated.");

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      const userData = userSnap.exists()
        ? userSnap.data()
        : { name: "User", earnings: 0, points: 0, tasksCompleted: 0, referrals: 0 };

      // Example: Fetch sample surveys and offers (if you have collections)
      const surveysSnap = await getDocs(collection(db, "surveys"));
      const offersSnap = await getDocs(collection(db, "offers"));

      const topSurveys = surveysSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      const topOffers = offersSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

      setDashboardData({
        user: {
          name: userData.fullName || user.displayName || "User",
          earnings: userData.balance || 0,
          tasksCompleted: userData.tasksCompleted || 0,
          referrals: userData.referrals || 0,
          points: userData.points || 0,
        },
        topSurveys,
        topOffers,
      });
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setApiError("Could not load dashboard data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Dummy notifications (you can later replace with Firestore collection)
  const fetchNotifications = async () => {
    try {
      const notifSnap = await getDocs(collection(db, "notifications"));
      const notifs = notifSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setNotifications(notifs);
    } catch (err) {
      console.error("Notifications fetch error:", err);
      setNotifications([]);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchNotifications();
  }, []);

  const handleRetry = () => {
    fetchDashboardData();
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const { user, topSurveys, topOffers } = dashboardData;
  const dollarsFromPoints = (user.points / 100).toFixed(2);

  return (
    <div className="max-w-md mx-auto space-y-6 pb-16">
      {/* Error Banner */}
      {apiError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-500 text-sm">{apiError}</p>
            <button
              onClick={handleRetry}
              className="text-red-500 hover:text-red-400 text-xs underline flex items-center mt-1"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh data
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user.name || "Guest"} 👋
          </h1>
          <p className="text-gray-400">Let’s earn more today!</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white relative p-1 hover:bg-gray-800 rounded-full transition-colors"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            )}
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-[#140932] border border-gray-700 rounded-lg shadow-lg z-10">
              {notifications.length === 0 ? (
                <p className="p-3 text-gray-500">No notifications</p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 text-sm text-white border-b border-gray-700"
                  >
                    {n.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="Earnings" value={`$${user.earnings.toFixed(2)}`} color="blue" />
        <StatCard label="Tasks Completed" value={user.tasksCompleted} color="green" />
        <StatCard
          label="Points"
          value={`${user.points} pts`}
          sub={`(~$${dollarsFromPoints})`}
          color="yellow"
        />
        <StatCard
          label="Referrals"
          value={user.referrals}
          color="purple"
          link={{ to: "/dashboard/referral", text: "View referral details →" }}
        />
      </div>

      {/* Top Surveys */}
      <Section title="🔥 Top Surveys">
        {topSurveys.length > 0 ? (
          topSurveys.map((survey) => (
            <ItemCard
              key={survey.id}
              title={survey.title}
              reward={`$${survey.reward || 0}`}
              link={`/dashboard/survey/${survey.id}`}
              linkText="Start Survey →"
              color="blue"
            />
          ))
        ) : (
          <EmptyState text="No surveys available" />
        )}
      </Section>

      {/* Top Offers */}
      <Section title="💎 Top Offers">
        {topOffers.length > 0 ? (
          topOffers.map((offer) => (
            <ItemCard
              key={offer.id}
              title={offer.title}
              reward={`$${offer.reward || 0}`}
              link={`/dashboard/offers/${offer.id}`}
              linkText="View Offer →"
              color="green"
            />
          ))
        ) : (
          <EmptyState text="No offers available" />
        )}
      </Section>
    </div>
  );
}

/* ---------- Reusable UI Components ---------- */

function StatCard({ label, value, color, sub, link }) {
  const colors = {
    blue: "border-blue-500 text-blue-700",
    green: "border-green-500 text-green-700",
    yellow: "border-yellow-500 text-yellow-600",
    purple: "border-purple-500 text-purple-700",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow p-4 text-center border-t-4 ${colors[color]}`}
    >
      <h2 className="text-sm text-gray-500">{label}</h2>
      <p className="text-xl font-bold">{value}</p>
      {sub && <p className="text-sm text-gray-600">{sub}</p>}
      {link && (
        <Link to={link.to} className="text-sm text-blue-600 hover:underline mt-1 block">
          {link.text}
        </Link>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      {children}
    </div>
  );
}

function ItemCard({ title, reward, link, linkText, color }) {
  const rewardColors = {
    blue: "text-blue-600",
    green: "text-green-600",
  };

  return (
    <div className="bg-white border rounded-lg p-3 shadow">
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <p className={`${rewardColors[color]} text-sm font-bold`}>{reward}</p>
      <Link to={link} className={`text-sm ${rewardColors[color]} hover:underline`}>
        {linkText}
      </Link>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="bg-gray-800/20 border border-gray-700 rounded-lg p-4 text-center">
      <p className="text-gray-400">{text}</p>
    </div>
  );
}
