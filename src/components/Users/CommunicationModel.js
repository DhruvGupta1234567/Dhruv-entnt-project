import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CommunicationModal = ({ onClose, logCommunication }) => {
  const [formData, setFormData] = useState({
    type: '',
    date: new Date(),
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logCommunication(formData);
    onClose();
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Log New Communication</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="mt-4">
          <FormControl fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              label="Type"
              required
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="LinkedIn Post">LinkedIn Post</MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="Phone Call">Phone Call</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Date of Communication"
            type="date"
            value={formData.date.toISOString().split('T')[0]} // Formatting date for input
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter additional notes"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />

        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommunicationModal;
