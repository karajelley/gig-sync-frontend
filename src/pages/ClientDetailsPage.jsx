import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Button, Box, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationDialog from "../components/Mui/ConfirmationDialog";
import Alert from "../components/Mui/Alerts";
import ClientForm from "../components/Mui/ClientForm";
// import ProjectCard from "../components/Mui/ProjectCard";
import { API_URL } from "../api/config";
import axios from "axios";

function ClientDetailsPage() {
  const { id } = useParams();
  const {
    projects,
    clients,
    fetchData,
    isEditing,
    setIsEditing,
    errorMessage,
    setErrorMessage,
    successMessage,
    setSuccessMessage,
  } = useContext(AppContext);
  const client = clients.find((client) => client._id === id);
  console.log("Client fetched:", client);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const [openDialog, setOpenDialog] = useState(false);
  const [newClient, setNewClient] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    company: client?.company || "",
  });


  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/clients/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setSuccessMessage("Client deleted successfully!");
      navigate("/api/clientspage");
    } catch (error) {
      console.error("Error during deletion:", error.response || error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete the client."
      );
    } finally {
      setOpenDialog(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setNewClient({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
      project: client.project || [],
    });
  };

  const handleEditClient = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const response = await axios.put(`${API_URL}/clients/${id}`, newClient, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      await fetchData();

      setSuccessMessage("Client updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error during client update:", error);

      if (error.response) {
        console.error("API Error Response:", error.response.data);
        setErrorMessage(
          error.response.data.message || "Failed to update the client."
        );
      } else if (error.request) {
        console.error("No response received from API:", error.request);
        setErrorMessage("No response from the server. Please try again later.");
      } else {
        console.error("Unexpected error:", error.message);
        setErrorMessage("An error occurred: " + error.message);
      }
    }
  };

  if (!client) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Client not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '100px 20px 20px 140px', overflow: 'hidden' }}>
    {successMessage && <Alert severity="success">{successMessage}</Alert>}
    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          {client.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Email: {client.email}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Phone: {client.phone}
        </Typography>
        {/* <Typography variant="subtitle1" color="text.secondary">
          {client.projects?.length || 0} Projects
        </Typography> */}
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<EditIcon />}
        onClick={handleEditClick}
        sx={{
          position: "relative",
          top: 0,
          right: 0,
          zIndex: 10,
        }}
      >
        Edit
      </Button>
    </Box>

    {/* Projects Section
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Projects
      </Typography>
      <Grid container spacing={2}>
        {client.projects?.length > 0 ? (
          client.projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card variant="outlined" sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography color="text.secondary">
                    {project.description || "No description available."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography>No projects associated with this client.</Typography>
        )}
      </Grid>
    </Box> */}

    {/* Delete Section */}
    <Box>
      <Typography variant="h6" color="error" gutterBottom>
        Delete Client
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        ⚠️ *This will delete this client and all projects associated with them.
        This action cannot be undone.
      </Typography>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
    </Box>

    <ConfirmationDialog
      open={openDialog}
      handleClose={handleDialogClose}
      handleConfirm={handleConfirmDelete}
      title="Delete Client?"
      description="Are you sure you want to delete this client? This action cannot be undone."
    />

    {/* Edit Form */}
    {isEditing && (
      <ClientForm
        clientData={newClient}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleEditClient}
        isEditing={isEditing}
        buttonLabel="Update Client"
      />
    )}
  </Box>
  );
}

export default ClientDetailsPage;
