import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, TextField, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';

const DashboardTable = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCommunication, setNewCommunication] = useState({
    type: '',
    date: '',
    notes: '',
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/companies');
      setCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleOpenModal = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
    setShowModal(false);
    setNewCommunication({ type: '', date: '', notes: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommunication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCompany) {
      const communicationData = {
        type: newCommunication.type,
        date: newCommunication.date,
        notes: newCommunication.notes,
        companyId: selectedCompany.id,
        companyName: selectedCompany.name,
      };

      const updatedCompanies = companies.map((company) =>
        company.id === selectedCompany.id
          ? {
              ...company,
              lastCommunications: [
                ...company.lastCommunications,
                communicationData,
              ],
            }
          : company
      );

      setCompanies(updatedCompanies);
      handleCloseModal();
    }
  };

  const getColorClass = (date) => {
    const now = new Date();
    const scheduledDate = new Date(date);

    if (scheduledDate < now) return 'bg-red-100';
    if (scheduledDate.toDateString() === now.toDateString()) return 'bg-yellow-100';
    return 'bg-green-100';
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Last Five Communications</TableCell>
              <TableCell>Next Scheduled Communication</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id} sx={{ backgroundColor: getColorClass(company.nextCommunication) }}>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {(company.lastCommunications || []).map((comm, index) => (
                    <div key={index}>
                      <strong>{comm.type}</strong> ({comm.date}) - {comm.notes}
                    </div>
                  ))}
                </TableCell>
                <TableCell>{company.nextCommunication || 'Not Scheduled'}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenModal(company)}
                  >
                    Add Communication
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Log New Communication
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Type of Communication</InputLabel>
              <Select
                name="type"
                value={newCommunication.type}
                onChange={handleInputChange}
                label="Type of Communication"
              >
                <MenuItem value="Email">Email</MenuItem>
                <MenuItem value="Phone Call">Phone Call</MenuItem>
                <MenuItem value="LinkedIn Message">LinkedIn Message</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              label="Date of Communication"
              name="date"
              type="date"
              value={newCommunication.date}
              onChange={handleInputChange}
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Add Notes"
              name="notes"
              value={newCommunication.notes}
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />

            <Box mt={2} display="flex" justifyContent="space-between">
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCloseModal}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

export default DashboardTable;
