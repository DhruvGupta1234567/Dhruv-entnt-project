import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Paper, Typography, Box } from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: 'Frequency',
        data: data.map((item) => item.value),
        backgroundColor: 'rgba(99, 110, 250, 0.8)', // Changed color
        borderColor: 'rgba(99, 110, 250, 1)', // Changed border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Roboto, sans-serif',
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Roboto, sans-serif',
            size: 14,
            weight: 'bold',
            color: '#333', // Font color for x-axis
          },
        },
      },
      y: {
        ticks: {
          font: {
            family: 'Roboto, sans-serif',
            size: 14,
            weight: 'bold',
            color: '#333', // Font color for y-axis
          },
        },
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f4f7ff', borderRadius: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Communication Frequency
        </Typography>
        <Box sx={{ width: '100%', height: '300px' }}>
          <Bar data={chartData} options={options} />
        </Box>
      </Box>
    </Paper>
  );
};

export default BarChart;
