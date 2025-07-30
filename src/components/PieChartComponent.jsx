import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#007bff', '#ffc107', '#dc3545']; // Stock - Bond - Crypto

const PieChartComponent = ({ assets }) => {
  const typeCounts = assets.reduce((acc, asset) => {
    acc[asset.type] = (acc[asset.type] || 0) + asset.quantity * asset.currentPrice;
    return acc;
  }, {});

  const data = Object.keys(typeCounts).map((type, index) => ({
    name: type,
    value: typeCounts[type],
  }));

  return (
    <div>
      <h5 className="text-center mb-3">Asset Distribution</h5>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            label
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
