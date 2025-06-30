import React, { useState } from 'react';
import DashboardSideBar from '../componemts/DashboardSideBar';
import Topbar from '../componemts/TopBar';
import MonthlyIncomeChart from '../componemts/MonthlyIncomeChart';
import DailyIncomeChart from '../componemts/DailyIncomeChart';
import StatsCards from '../componemts/StatsCards'
import BookTable from '../componemts/BookTable'
import OrdersTable from '../componemts/OrdersTable';
function AdminDashboard() {
  const [page, setPage] = useState('dashboard');

  const renderContent = () => {
    switch (page) {
      case 'dashboard':
  return (
     <div className="p-6 space-y-6">
      {/* Top Stats */}
      <span className="text-2xl font-bold mb-6">Dashboard</span>
      <StatsCards />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyIncomeChart />
        <MonthlyIncomeChart />
      </div>
    </div>
  );
      case 'book':
          return <BookTable />;
     case 'orders':
          return <OrdersTable />;
      default:
        return <h2 className="text-xl font-semibold">📄 Page not found</h2>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DashboardSideBar setPage={setPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
