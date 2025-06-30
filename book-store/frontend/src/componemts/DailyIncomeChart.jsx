import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useAuth } from '../context/AuthContext';

function DailyIncomeChart() {
  const [data, setData] = useState([]);
  const { token } = useAuth();

  const weekdayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    axios.get('http://localhost:8082/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => {
      const orders = res.data;
      const incomeMap = {
        'Mon': 0,
        'Tue': 0,
        'Wed': 0,
        'Thu': 0,
        'Fri': 0,
        'Sat': 0,
        'Sun': 0,
      };

      orders.forEach(order => {
        if (order.status === "COMPLETED") {
          const date = new Date(order.date);
          const dayIndex = date.getDay(); 
          const weekday = weekdayNames[(dayIndex + 6) % 7];
          incomeMap[weekday] += order.totalPrice;
        }
      });

      const chartData = weekdayNames.map(day => ({
        day,
        income: incomeMap[day],
      }));

      setData(chartData);
    })
    .catch(err => {
      console.error("Error fetching orders:", err);
    });
  }, []);

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Daily Income</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DailyIncomeChart;
