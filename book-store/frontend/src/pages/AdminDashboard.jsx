import React, { useState } from 'react';
import DashboardSideBar from '../componemts/DashboardSideBar';
import Topbar from '../componemts/TopBar';

function AdminDashboard() {
  const [page, setPage] = useState('dashboard');

  const renderContent = () => {
    switch (page) {
      case 'dashboard':
        return <h2 className="text-xl font-semibold">📊 Dashboard Overview</h2>;
      case 'ecommerce':
        return <h2 className="text-xl font-semibold">🛒 eCommerce Management</h2>;
      case 'calendar':
        return <h2 className="text-xl font-semibold">🗓️ Calendar Events</h2>;
      case 'profile':
        return <h2 className="text-xl font-semibold">👤 User Profile</h2>;
      case 'forms':
        return <h2 className="text-xl font-semibold">📝 Form Inputs</h2>;
      case 'tables':
        return <h2 className="text-xl font-semibold">📋 Data Tables</h2>;
      case 'settings':
        return <h2 className="text-xl font-semibold">⚙️ Settings Panel</h2>;
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
