import React from 'react';
import {
  FaHome
} from 'react-icons/fa';
import {favicon} from '../assets/icons8-bookstore-50.png'
function DashboardSideBar({ setPage }) {
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-md p-5 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-600 mb-10 flex items-center gap-2">
        <span className="text-3xl">📊</span> TailAdmin
      </h1>

      <nav className="flex-1">
        <ul className="space-y-2 text-gray-700 text-[16px] font-medium">
          {menuItems.map((item) => (
            <li
              key={item.key}
              onClick={() => setPage(item.key)}
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-100 cursor-pointer transition"
            >
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default DashboardSideBar;
