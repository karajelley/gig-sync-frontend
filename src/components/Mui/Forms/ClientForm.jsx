// External Libraries
// MUI Libraries
import { Button, Box, Grid2, TextField, Typography } from "@mui/material";
// Internal Libraries / Components

function ClientForm({
  buttonLabel,
  clientData,
  handleFormSubmit,
  handleInputChange,
}) {
  return (
    <Box sx={{ padding: 3, marginBottom: 4 }}>
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="submit" variant="contained">
                {buttonLabel}
              </Button>
            </Box>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
}

export default ClientForm;
