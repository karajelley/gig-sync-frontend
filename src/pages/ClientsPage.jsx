import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Paper, TextField, Typography, Alert } from "@mui/material";
import { Grid } from "@mui/system";
import ClientCard from "../components/Mui/ClientCard.jsx";
import { API_URL } from "../api/config";

function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const storedToken = localStorage.getItem("authToken");

  function getClients() {
    axios
      .get(`${API_URL}/clients`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(
            error.response.data.message || "An unknown error occurred."
          );
        } else if (error.request) {
          setErrorMessage(
            "No response from the server. Please try again later."
          );
        } else {
          setErrorMessage("An error occurred: " + error.message);
        }
      });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    axios
      .post(`${API_URL}/clients`, newClient, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setClients((prevClients) => [...prevClients, response.data]);
        setNewClient({ name: "", email: "", phone: "", company: "" }); // Reset form
        setSuccessMessage("Client added successfully!");
        setShowForm(false); // Hide form after successful submission
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(
            error.response.data.message || "Failed to add the client."
          );
        } else if (error.request) {
          setErrorMessage("No response from the server. Please try again later.");
        } else {
          setErrorMessage("An error occurred: " + error.message);
        }
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
  <Typography variant="h4" gutterBottom>
    Clients
  </Typography>
  {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
  {successMessage && <Alert severity="success">{successMessage}</Alert>}

  {/* Toggle Form Button */}
  <Button
    variant="contained"
    color="primary"
    onClick={() => setShowForm((prev) => !prev)}
    sx={{ mb: 4 }}
  >
    {showForm ? "Hide Form" : "Create Client"}
  </Button>

  {/* Add New Client Form */}
  {showForm ? (
    <Paper sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Client
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newClient.name}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={newClient.email}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="tel"
              value={newClient.phone}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Company"
              name="company"
              value={newClient.company}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Add Client
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  ) : (
    // Only show the clients list when the form is hidden
    <Grid container spacing={2}>
      {clients.map((client) => (
        <Grid item xs={12} sm={6} md={4} key={client._id}>
          <ClientCard client={client} />
        </Grid>
      ))}
    </Grid>
  )}
</Box>
  );
}

export default ClientsPage;
