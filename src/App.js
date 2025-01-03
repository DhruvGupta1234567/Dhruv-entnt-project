import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  BarChart as ReportsIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import axios from 'axios';
import CompanyList from './components/Admin/CompanyList';
import CommunicationMethodList from './components/Admin/CommunicationMethodList';
import DashboardTable from './components/Users/DashboardTable';
import CalendarView from './components/Users/CalendarView';
import NotificationPanel from './components/Users/NotificationPanel';
import ReportingPage from './components/Reporting/ReportingPage';
import CommunicationModel from './components/Users/CommunicationModel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);



  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/companies');
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching companies:', error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/user/dashboard' },
    { text: 'Companies', icon: <BusinessIcon />, path: '/admin/companies' },
    { text: 'Notifications', icon: <NotificationsIcon />, path: '/user/notifications' },
    { text: 'Calendar', icon: <CalendarIcon />, path: '/user/calendar' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  ];

  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar */}
        <Drawer
          variant="persistent"
          open={isSidebarOpen}
          sx={{
            width: isSidebarOpen ? 240 : 0,
            transition: 'width 0.3s',
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              transition: 'width 0.3s',
              backgroundColor: '#1e293b', 
              color: '#ffffff',
            },
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap>
              Communication App
            </Typography>
            <IconButton onClick={() => setIsSidebarOpen(false)} sx={{ color: '#ffffff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ bgcolor: '#2e3a4e' }} />
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                 
                  sx={{
                    '&:hover': { bgcolor: '#2e3a4e' },
                    '&.Mui-selected': { bgcolor: '#2e3a4e' },
                  }}
                >
                  <ListItemIcon sx={{ color: '#ffffff' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: isSidebarOpen ? 0 : 0 }}>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} sx={{ position: 'absolute', top: 16, left: 16 }}>
            <MenuIcon />
          </IconButton>
          <Routes>
            <Route path="/admin/companies" element={<CompanyList />} />
            <Route path="/admin/communication-methods" element={<CommunicationMethodList />} />
            <Route path="/user/dashboard" element={<DashboardTable />} />
            <Route path="/user/notifications" element={<NotificationPanel companies={companies} />} />
            <Route path="/user/calendar" element={<CalendarView companies={companies} />} />
            <Route path="/user/communication" element={<CommunicationModel />} />
            <Route path="/reports" element={<ReportingPage />} />
            <Route
              path="*"
              element={
                <Box sx={{ textAlign: 'center', mt: 10 }}>
                  <Typography variant="h4">Welcome to the Communication App</Typography>
                </Box>
              }
            />
          </Routes>
        </Box>

        {/* Toast Notifications */}
        <ToastContainer />
      </Box>
    </Router>
  );
};

export default App;
