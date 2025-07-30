import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// بيانات وهمية – بتعتمد على total value كل فترة
const generateMockData = (assets) => {
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Today'];
  return days.map((day, index) => {
    const fluctuation = 1 + (Math.random() - 0.5) * 0.1; // ±5%
    const value = assets.reduce((sum, asset) => {
      const current = asset.quantity * asset.currentPrice;
      return sum + current * fluctuation;
    }, 0);
    return { day, value: parseFloat(value.toFixed(2)) };
  });
};

const LineChartComponent = ({ assets }) => {
  const data = generateMockData(assets);

  return (
    <div>
      <h5 className="text-center mb-3">Portfolio Value Over Time</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#28a745" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
