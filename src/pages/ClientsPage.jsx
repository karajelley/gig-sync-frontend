import { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import ClientForm from "../components/Mui/ClientForm";
import ConfirmationDialog from "../components/Mui/ConfirmationDialog";
import Alerts from "../components/Mui/Alerts";
import ClientCard from "../components/Mui/ClientCard";
import axios from "axios";
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
  const [isEditing, setIsEditing] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

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

  useEffect(() => {
    getClients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isEditing && clientToEdit) {
      axios
        .put(`${API_URL}/clients/${clientToEdit}`, newClient, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setClients((prevClients) =>
            prevClients.map((client) =>
              client._id === clientToEdit ? response.data : client
            )
          );
          setSuccessMessage("Client updated successfully!");
          setShowForm(false);
          setIsEditing(false);
          setClientToEdit(null);
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(
              error.response.data.message || "Failed to update the client."
            );
          } else if (error.request) {
            setErrorMessage(
              "No response from the server. Please try again later."
            );
          } else {
            setErrorMessage("An error occurred: " + error.message);
          }
        });
    } else {
      axios
        .post(`${API_URL}/clients`, newClient, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setClients((prevClients) => [...prevClients, response.data]);
          setSuccessMessage("Client added successfully!");
          setShowForm(false);
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(
              error.response.data.message || "Failed to add the client."
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
    setNewClient({ name: "", email: "", phone: "", company: "" });
  };

  const handleEditClick = (client) => {
    setNewClient({
      name: client.name,
      email: client.email,
      phone: client.phone,
      company: client.company,
    });
    setClientToEdit(client._id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteClick = (clientId) => {
    setClientToDelete(clientId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setClientToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (clientToDelete) {
      axios
        .delete(`${API_URL}/clients/${clientToDelete}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          setClients((prevClients) =>
            prevClients.filter((client) => client._id !== clientToDelete)
          );
          setSuccessMessage("Client deleted successfully!");
        })
        .catch((error) => {
          if (error.response) {
            setErrorMessage(
              error.response.data.message || "Failed to delete the client."
            );
          } else if (error.request) {
            setErrorMessage(
              "No response from the server. Please try again later."
            );
          } else {
            setErrorMessage("An error occurred: " + error.message);
          }
        })
        .finally(() => {
          setOpenDialog(false);
          setClientToDelete(null);
        });

        
    }
  };

  return (
    <Box
      sx={{
        marginTop: "60px", // Compensates for the height of the AppBar, adjust as needed
        marginLeft: "80px", // Ensures the content is not under the Drawer, adjust as needed
        transition: "margin-left 0.3s", // Smooth transition for the drawer movement if it's dynamic
        padding: 2,
      }}
    >
      <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
      >
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>
      <Alerts errorMessage={errorMessage} successMessage={successMessage} />

      {/* Toggle Form Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setShowForm((prev) => !prev);
          setIsEditing(false);
          setClientToEdit(null);
          setNewClient({ name: "", email: "", phone: "", company: "" });
        }}
        sx={{ mb: 4 }}
      >
        {showForm ? "Hide Form" : "Create Client"}
      </Button>
      </Box>

      {/* Add or Edit Client Form */}
      {showForm && (
        <ClientForm
          clientData={newClient}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          buttonLabel={isEditing ? "Update Client" : "Add Client"}
        />
      )}

      {/* Client Cards */}
      {!showForm && (
        <Grid container spacing={2}>
          {clients.map((client) => (
            <Grid item xs={12} sm={6} md={4} key={client._id}>
              <ClientCard
                client={client}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Alert Dialog for Delete Confirmation */}
      <ConfirmationDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleConfirm={handleConfirmDelete}
        title={"Delete Client?"}
        description={"Are you sure you want to delete this client? This action cannot be undone."}
      />
    </Box>
  );
}

export default ClientsPage;
