import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const OrderPage = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [openDetails, setOpenDetails] = useState({});

  useEffect(() => {
    if (!user?.id) return;

    axios.get(`http://localhost:8082/api/orders/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [user?.id, token]);

  const toggleDetails = (orderId) => {
    setOpenDetails(prev => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm">
            <tr>
              <th className="px-4 py-2 text-left">Order</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Payment</th>
              <th className="px-4 py-2 text-left">Total</th>
              <th className="px-4 py-2 text-left">Shipping Address</th>
              <th className="px-4 py-2 text-left">Items</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-2 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="border-t hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleDetails(order.id)}
                >
                  <td className="px-4 py-3 font-semibold">#{order.id}</td>
                  <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{order.paymentMethod}</td>
                  <td className="px-4 py-3">${order.totalPrice}</td>
                  <td className="px-4 py-3">{order.shippingAddress}</td>
                  <td className="px-4 py-3">{order.bookOrders.length} items</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${order.status === 'PENDING' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-cyan-500 text-lg">
                    {openDetails[order.id] ? '▲' : '▼'}
                  </td>
                </tr>
                {openDetails[order.id] && (
                  <tr className="bg-gray-50">
                    <td colSpan="8" className="px-4 py-2">
                      <ul className="list-disc list-inside space-y-1">
                        {order.bookOrders.map((item) => (
                          <li key={item.id}>
                            {item.book?.title} - Qty: {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;
