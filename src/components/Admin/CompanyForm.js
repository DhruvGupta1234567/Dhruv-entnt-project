import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Modal, Grid, Paper } from '@mui/material';
import { addCompany, updateCompany } from '../services/api';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const CompanyForm = ({ onClose, fetchCompanies, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    linkedInProfile: '',
    emails: '',
    phoneNumbers: '',
    comments: '',
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initialData) {
      await updateCompany(initialData.id, formData);
    } else {
      await addCompany(formData);
    }
    fetchCompanies();
    onClose();
  };

  return (
    <Modal open onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h5" component="h2" gutterBottom align="center">
          {initialData ? 'Edit Company' : 'Add Company'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                variant="outlined"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="LinkedIn Profile"
                name="linkedInProfile"
                value={formData.linkedInProfile}
                onChange={handleChange}
                variant="outlined"
                size="small"
                type="url"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                variant="outlined"
                size="small"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '48%' }}
            >
              Save
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              color="secondary"
              sx={{ width: '48%' }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CompanyForm;
