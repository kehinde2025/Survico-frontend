// src/components/DashboardLayout.jsx
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, ListChecks, Gift, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardLayout() {
  const location = useLocation();
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    // Simulate unread message check from localStorage
    const messages = JSON.parse(localStorage.getItem('user-chat')) || [];
    const lastRead = JSON.parse(localStorage.getItem('chat-last-read')) || 0;

    const unreadExists = messages.some(msg => msg.sender === 'admin' && msg.time > lastRead);
    setHasUnread(unreadExists);
  }, [location]);

  const navItems = [
    { label: 'Home', icon: <Home size={20} />, path: '/dashboard' },
    { label: 'Survey', icon: <ListChecks size={20} />, path: '/dashboard/survey' },
    { label: 'Offers', icon: <Gift size={20} />, path: '/dashboard/offers' },
    { label: 'More', icon: <Menu size={20} />, path: '/dashboard/more', hasBadge: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#140932]">
      <main className="pt-4 pb-20 px-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-[#140932] shadow-lg border-t flex justify-around items-center py-2 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center text-xs ${isActive ? 'text-blue-700 font-bold' : 'text-gray-500'}`}
            >
              {item.icon}
              <span>{item.label}</span>

              {/* 🔴 Unread Dot */}
              {item.hasBadge && hasUnread && (
                <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
