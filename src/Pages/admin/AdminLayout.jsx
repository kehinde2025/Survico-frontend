import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaMoneyCheck, FaUserShield, FaTrophy, FaComments, FaHome, FaTasks } from "react-icons/fa";
// Added FaTasks and FaUserShield if not already imported

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#140932] text-white flex flex-col py-6 px-4 space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Survico Admin Panel</h1>
        <nav className="space-y-3">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
              }`
            }
          >
            <FaHome /> Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaUsers /> Users
          </NavLink>
          <NavLink to="/admin/withdrawals" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaMoneyCheck /> Withdrawals
          </NavLink>
          <NavLink to="/admin/referrals" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaUserShield /> Referrals
          </NavLink>
          <NavLink to="/admin/leaderboard" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaTrophy /> Leaderboard
          </NavLink>
          <NavLink to="/admin/inspectors" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaUserShield /> Insepetator
          </NavLink>
          <NavLink to="/admin/chat" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaComments /> Chat
          </NavLink>
          <NavLink to="/admin/tasks" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaTasks /> Tasks
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-[#1e0c50] transition ${isActive ? "bg-[#1e0c50]" : ""
            }`
          }>
            <FaUserShield /> Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
