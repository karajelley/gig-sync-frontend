// External Libraries 
import React from "react";
// MUI Libraries
import { Box, Button, MenuItem, Paper, TextField } from "@mui/material";
// Internal Libraries / Components



function ProjectForm({
  buttonLabel,
  clients,
  handleFormSubmit,
  handleInputChange,
  projectData,
}) {


  return (
    <Paper sx={{ padding: 3, marginBottom: 4 }}>
      <form onSubmit={handleFormSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="title"
            label="Project Title"
            value={projectData.title}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="description"
            label="Description"
            value={projectData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="budget"
            label="Budget"
            type="number"
            value={projectData.budget}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="status"
            label="Status"
            value={projectData.status}
            onChange={handleInputChange}
            select
            fullWidth
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            name="client"
            label="Client"
            value={projectData.client || ""}
            onChange={handleInputChange}
            select
            fullWidth
            required
          >
            {clients.length > 0 ? (
              clients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {client.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="" disabled>
                No clients available
              </MenuItem>
            )}
          </TextField>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          {buttonLabel}
        </Button>
      </form>
    </Paper>
  );
}

export default ProjectForm;
