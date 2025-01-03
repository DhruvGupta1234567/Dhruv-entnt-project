import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Paper, Typography, Box } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Added vibrant colors
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
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#333',
        bodyColor: '#333',
        borderColor: '#ccc',
        borderWidth: 1,
        caretSize: 5,
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f4f7ff', borderRadius: 2 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
          Engagement Effectiveness
        </Typography>
        <Box sx={{ width: '100%', height: '300px' }}>
          <Pie data={chartData} options={options} />
        </Box>
      </Box>
    </Paper>
  );
};

export default PieChart;
