import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { useAuth } from '../context/AuthContext';
function MonthlyIncomeChart() {
  const [data, setData] = useState([]);
   const {  token } = useAuth();
  useEffect(() => {

    axios.get('http://localhost:8082/api/orders', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
     .then(res => {
        const orders = res.data;

        const incomeMap = {};

        orders.forEach(order => {
          if (order.status === "COMPLETED") {
            const date = new Date(order.date);
            const month = date.getMonth(); 
            if (!incomeMap[month]) incomeMap[month] = 0;
            incomeMap[month] += order.totalPrice;
          }
        });

        const chartData = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(0, i).toLocaleString("default", { month: "short" }),
          income: incomeMap[i] || 0,
        }));

        setData(chartData);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  return (
    <div className="w-full h-[400px] p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Monthly Income</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#06b6d4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeChart;
