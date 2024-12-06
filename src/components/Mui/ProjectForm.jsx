import { Grid, TextField, Button, Paper, Typography, MenuItem } from "@mui/material";

function ProjectForm({ projectData, handleInputChange, handleFormSubmit, buttonLabel }) {
  return (
    <Paper sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        {buttonLabel === "Add Project" ? "Add New Project" : "Edit Project"}
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={projectData.title}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={projectData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Budget"
              name="budget"
              type="number"
              value={projectData.budget}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={projectData.status}
              onChange={handleInputChange}
            >
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Client"
              name="client"
              value={projectData.client}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              {buttonLabel}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ProjectForm;
