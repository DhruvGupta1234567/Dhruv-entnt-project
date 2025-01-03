import React from 'react';
import { Grid, Paper, Typography, Box, Container } from '@mui/material';
import BarChart from './BarChart';
import PieChart from './PieChart';
import ExportButton from './ExportButton';
import ActivityLog from './ActivityLog';

const ReportingPage = () => {
  const barData = [
    { label: 'LinkedIn', value: 12 },
    { label: 'Email', value: 8 },
    { label: 'Calls', value: 5 },
  ];

  const pieData = [
    { label: 'Successful', value: 60 },
    { label: 'Pending', value: 30 },
    { label: 'Failed', value: 10 },
  ];

  const reportData = [
    { field1: 'LinkedIn', field2: '12', field3: 'Successful' },
    { field1: 'Email', field2: '8', field3: 'Pending' },
  ];

  return (
    <Container maxWidth="lg" sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Reporting and Analytics
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <BarChart data={barData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <PieChart data={pieData} />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
            <ExportButton data={reportData} />
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
          <ActivityLog apiUrl="/api/activity" />
        </Paper>
      </Box>
    </Container>
  );
};

export default ReportingPage;
