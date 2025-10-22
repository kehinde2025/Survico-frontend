import React from 'react'

import { NavLink } from 'react-router-dom';
import { FaHome, FaClipboardList, FaMoneyCheckAlt, FaEllipsisH } from 'react-icons/fa';

export default function BottomNav() {
  const unreadMessages = true; // Later, you’ll make this dynamic

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 border-t">
      <NavLink to="/dashboard" className="flex flex-col items-center text-sm">
        <FaHome size={20} />
        <span>Home</span>
      </NavLink>

      <NavLink to="/dashboard/survey" className="flex flex-col items-center text-sm">
        <FaClipboardList size={20} />
        <span>Survey</span>
      </NavLink>

      <NavLink to="/dashboard/withdrawal" className="flex flex-col items-center text-sm">
        <FaMoneyCheckAlt size={20} />
        <span>Withdraw</span>
      </NavLink>

      <NavLink to="/dashboard/more" className="relative flex flex-col items-center text-sm">
        <FaEllipsisH size={20} />
        <span>More</span>
        {unreadMessages && (
          <span className="absolute top-0 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
        )}
      </NavLink>
    </nav>
  );
}

