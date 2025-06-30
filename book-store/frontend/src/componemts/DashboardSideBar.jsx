import React from 'react';
import { FaHome } from 'react-icons/fa';
import favicon from '../assets/icons8-bookstore-50.png';
import { IoBookOutline } from "react-icons/io5";
import { RiBillLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
function DashboardSideBar({ setPage }) {
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: <FaHome /> },
    { key: 'book', label: 'Book', icon: <IoBookOutline /> },
    { key: 'orders', label: 'Orders', icon: <RiBillLine /> },
  ];

  return (
    <aside className="w-64 bg-white h-screen shadow-md p-5 flex flex-col">
      <Link to = '/'><h1 className="text-2xl font-bold text-blue-600 mb-10 flex items-center gap-2">
        <img src={favicon} alt="favicon" className="w-6 h-6" />
        BookStore
      </h1>
      </Link>

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
