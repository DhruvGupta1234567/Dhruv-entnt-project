import React, { useEffect, useState } from 'react';
import { getCompanies, deleteCompany } from '../services/api';
import CompanyForm from './CompanyForm';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const [companyToDelete, setCompanyToDelete] = useState(null); // Store the company to be deleted

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data } = await getCompanies();
    setCompanies(data);
  };

  const handleDelete = async () => {
    if (companyToDelete) {
      await deleteCompany(companyToDelete.id);
      fetchCompanies();
      setOpenDialog(false); // Close the dialog after deleting
    }
  };

  const handleDeleteDialogOpen = (company) => {
    setCompanyToDelete(company); // Set the company to delete
    setOpenDialog(true); // Open the dialog
  };

  const handleDeleteDialogClose = () => {
    setOpenDialog(false); // Close the dialog if the user disagrees
    setCompanyToDelete(null); // Clear the selected company to delete
  };

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Company Management
      </Typography>

      {/* Add Company Button Centered */}
      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
        >
          Add Company
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.location}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(company)}
                    color="primary"
                  >
                    <AiFillEdit className="text-blue-500" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteDialogOpen(company)} // Open the dialog on delete click
                    color="error"
                  >
                    <AiFillDelete className="text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for delete confirmation */}
      <Dialog
        open={openDialog}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Do you really want to delete this company?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      {showForm && (
        <CompanyForm
          onClose={() => {
            setShowForm(false);
            setSelectedCompany(null);
          }}
          fetchCompanies={fetchCompanies}
          initialData={selectedCompany}
        />
      )}
    </Box>
  );
};

export default CompanyList;
