// External Libraries 
import React from "react";
// MUI Libraries
import { Button, Grid2, MenuItem, Paper, TextField } from "@mui/material";
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
        <Grid2 container spacing={2} direction="column">
          <Grid2 item xs={12}>
            <TextField
              name="title"
              label="Project Title"
              value={projectData.title}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              name="description"
              label="Description"
              value={projectData.description}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid2>
          <Grid2 item xs={12}>
            <TextField
              name="budget"
              label="Budget"
              type="number"
              value={projectData.budget}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid2>
          <Grid2 item xs={12}>
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
          </Grid2>
          <Grid2 item xs={12}>
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
          </Grid2>
          <Grid2 item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {buttonLabel}
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Paper>
  );
  }
  
  export default ProjectForm;
  