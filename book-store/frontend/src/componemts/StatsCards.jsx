import { FaRegUser } from "react-icons/fa";
import { FiBook } from "react-icons/fi";

import { TbInvoice } from "react-icons/tb";
function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Users Card */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
        <div className="bg-teal-400 text-white rounded-full p-4">
          <FaRegUser size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">5000</h3>
          <p className="text-gray-500 text-sm">Users</p>
        </div>
      </div>

      {/* Books Card */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
        <div className="bg-rose-400 text-white rounded-full p-4">
          <FiBook size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">4.8k</h3>
          <p className="text-gray-500 text-sm">Books</p>
        </div>
      </div>

      {/* Orders Card */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center space-x-4">
        <div className="bg-cyan-500 text-white rounded-full p-4">
          <TbInvoice size={24} />
        </div>
        <div>
          <h3 className="text-xl font-semibold">690</h3>
          <p className="text-gray-500 text-sm">Orders</p>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
