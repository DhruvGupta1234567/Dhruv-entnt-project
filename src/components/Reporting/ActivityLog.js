import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const ActivityLog = ({ apiUrl, maxRecords = 3 }) => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      // Replace this with a real API call if needed
      const data = [
        { id: 1, activity: 'User logged in', timestamp: '2024-12-30 10:00' },
        { id: 2, activity: 'User updated profile', timestamp: '2024-12-30 11:00' },
        { id: 3, activity: 'User logged out', timestamp: '2024-12-30 12:00' },
        { id: 4, activity: 'User uploaded a file', timestamp: '2024-12-30 13:00' },
      ];
      setActivities(data.slice(0, maxRecords)); // Limit to maxRecords
    };

    fetchData();
  }, [apiUrl, maxRecords]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Activity Log
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="activity log table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                <TableCell>{activity.id}</TableCell>
                <TableCell>{activity.activity}</TableCell>
                <TableCell>{activity.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ActivityLog;
