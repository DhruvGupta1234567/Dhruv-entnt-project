import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

const NotificationPanel = ({ companies = [] }) => {
  useEffect(() => {
    if (companies.some((company) =>
      company.lastCommunications.some(
        (communication) => new Date(communication.date) < new Date()
      )
    )) {
      toast.info('You have overdue communications with some companies!', {
        position: 'top-right',
      });
    }
  }, [companies]);

  const overdueCompanies = companies
    .map((company) => {
      const overdueCommunications = company.lastCommunications.filter(
        (communication) => new Date(communication.date) < new Date()
      );
      return {
        name: company.name,
        overdueCommunications,
      };
    })
    .filter((company) => company.overdueCommunications.length > 0);

  const todayCompanies = companies
    .map((company) => {
      const todayCommunications = company.lastCommunications.filter(
        (communication) => new Date(communication.date).toDateString() === new Date().toDateString()
      );
      return {
        name: company.name,
        todayCommunications,
      };
    })
    .filter((company) => company.todayCommunications.length > 0);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        Company Notifications
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="error" gutterBottom>
                Overdue Communications
              </Typography>
              {overdueCompanies.length > 0 ? (
                overdueCompanies.map((company, index) => (
                  <Card key={index} sx={{ backgroundColor: '#f8d7da', mb: 2, boxShadow: 1 }}>
                    <CardContent>
                      <Typography variant="body1" component="strong" color="text.primary">
                        {company.name}
                      </Typography>
                      {company.overdueCommunications.map((communication, idx) => (
                        <Typography key={idx} variant="body2" color="text.secondary">
                          - Last Communication: {communication.date} - Due{' '}
                          {Math.ceil((new Date() - new Date(communication.date)) / (1000 * 3600 * 24))} days ago
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No overdue communications
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" color="primary" gutterBottom>
                Today's Communications
              </Typography>
              {todayCompanies.length > 0 ? (
                todayCompanies.map((company, index) => (
                  <Card key={index} sx={{ backgroundColor: '#fff3cd', mb: 2, boxShadow: 1 }}>
                    <CardContent>
                      <Typography variant="body1" component="strong" color="text.primary">
                        {company.name}
                      </Typography>
                      {company.todayCommunications.map((communication, idx) => (
                        <Typography key={idx} variant="body2" color="text.secondary">
                          - Last Communication: {communication.date}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No communications for today
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotificationPanel;
