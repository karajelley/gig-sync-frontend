import { AppContext } from "../context/AppContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useState, useEffect,} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alerts from "../components/Mui/Alerts";
import axios from "axios";
import ClientCard from "../components/Mui/ClientCard";
import ClientForm from "../components/Mui/ClientForm";
import ConfirmationDialog from "../components/Mui/ConfirmationDialog";
// Internal Libraries / Components
import { API_URL } from "../api/config";

function ClientsPage() {

  const { clients, setClients, errorMessage, setErrorMessage, fetchData } = useContext(AppContext);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate(); 


  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

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

  const handleDetailsClick = (clientId) => {
    navigate(`/api/clientdetails/${clientId}`);
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
        marginTop: "60px", 
        marginLeft: "80px", 
        transition: "margin-left 0.3s", 
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
            <Grid key={client._id} item xs={12} sm={6} md={4}>
              <ClientCard
                client={client}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                onDetailsClick={handleDetailsClick} 
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
