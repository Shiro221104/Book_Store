import React from 'react';
import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from "react-router-dom"; 
function Topbar() {
  const { user, logout } = useAuth();
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-sm">
      
      {/* BÊN TRÁI: Thanh tìm kiếm */}
      <div className="w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {/* BÊN PHẢI: Icon và user info */}
      <div className="flex items-center gap-6">
        
        {/* Icon chuông */}
        <div className="relative cursor-pointer text-gray-600">
          <FaBell size={18} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        {/* Thông tin người dùng */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">{user.fullName}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <img
            src="https://th.bing.com/th/id/OIP.9_MptOLxjJEGSGukPt9FWQHaHa?w=186&h=186&c=7&r=0&o=7&cb=iwp2&dpr=1.3&pid=1.7&rm=3"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border"
          />
        
        </div>

        {/* Icon Logout bên phải avatar */}
        <div className="cursor-pointer text-gray-600">
          <Link to="/"> <FaSignOutAlt onClick={() => {
                          logout();}} size={18}  /></Link>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
