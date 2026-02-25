import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const LineChartComponent = ({ data }) => {
  // Format data for Recharts
  const formattedData = data.map(item => ({
    date: new Date(item.createdAt).toLocaleDateString(), // Format date for readability
    line: item.line
  }));

  return (
    <LineChart width={800} height={400} data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="line" stroke="#8884d8" />
    </LineChart>
  );
};

export default LineChartComponent;
