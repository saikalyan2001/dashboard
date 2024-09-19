// src/SalesChart.js
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 40, 45, 60, 70],
        fill: false,
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-widget" style={{ width: '400px', height: '400px' }}>
      <h3>Sales Over Time</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
