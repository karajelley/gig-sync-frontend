// External Libraries 
// MUI Libraries
import { Button, Grid2, Paper, TextField, Typography } from "@mui/material";
// Internal Libraries / Components



function ClientForm({ buttonLabel, clientData, handleFormSubmit, handleInputChange }) {


  return (
  <Paper sx={{ padding: 3, marginBottom: 4 }}>
    <Typography variant="h6" gutterBottom>
      {buttonLabel === "Add Client" ? "Add New Client" : "Edit Client"}
    </Typography>
    <form onSubmit={handleFormSubmit}>
      <Grid2 container spacing={2} direction="column">
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={clientData.name}
            onChange={handleInputChange}
            required
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={clientData.email}
            onChange={handleInputChange}
            required
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            value={clientData.phone}
            onChange={handleInputChange}
            required
          />
        </Grid2>
        <Grid2 item xs={12}>
          <TextField
            fullWidth
            label="Company"
            name="company"
            value={clientData.company}
            onChange={handleInputChange}
          />
        </Grid2>
        <Grid2 item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            {buttonLabel}
          </Button>
        </Grid2>
      </Grid2>
    </form>
  </Paper>
);
}

export default ClientForm;
