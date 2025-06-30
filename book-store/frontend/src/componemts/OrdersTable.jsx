import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaCheck, FaTimesCircle } from 'react-icons/fa';

function OrdersTable() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8082/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Failed to fetch orders", err));
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:8082/api/orders/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(fetchOrders)
      .catch(err => console.error("Failed to update status", err));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6"> Orders</h2>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Total Price</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Shipping</th>
              <th className="py-2 px-4 text-left">Payment</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">
                  {order.user?.fullName || order.user?.username || 'N/A'}
                </td>
                <td className="py-2 px-4">${order.totalPrice.toFixed(2)}</td>
                <td className="py-2 px-4">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">{order.shippingAddress}</td>
                <td className="py-2 px-4 capitalize">{order.paymentMethod}</td>
                <td className="py-2 px-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full shadow hover:bg-blue-600 transition"
                      onClick={() => updateStatus(order.id, 'CONFIRMED')}
                    >
                      <FaCheck /> Confirm
                    </button>
                    <button
                      className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full shadow hover:bg-green-600 transition"
                      onClick={() => updateStatus(order.id, 'COMPLETED')}
                    >
                      <FaCheckCircle /> Complete
                    </button>
                    <button
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-full shadow hover:bg-red-600 transition"
                      onClick={() => updateStatus(order.id, 'CANCELLED')}
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center py-4 text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default OrdersTable;
