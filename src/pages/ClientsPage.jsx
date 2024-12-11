import { AppContext } from "../context/AppContext";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alerts from "../components/Mui/Alerts";
import axios from "axios";
import ClientCard from "../components/Mui/ClientCard";
import ClientForm from "../components/Mui/ClientForm";
import ConfirmationDialog from "../components/Mui/ConfirmationDialog";
// Internal Libraries / Components
import { API_URL } from "../api/config";

function ClientsPage() {
  const {
    clients,
    setClients,
    errorMessage,
    setErrorMessage,
    fetchData,
    isEditing,
    setIsEditing,
    showForm,
    setShowForm
  } = useContext(AppContext);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [clientToEdit, setClientToEdit] = useState(null);
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

  const handleEditClick = (client) => {
    setClientToEdit(client); 
    setNewClient({
      name: client.name || "",
      email: client.email || "",
      phone: client.phone || "",
      company: client.company || "",
    }); 
    setShowForm(true); 
    setIsEditing(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
        if (clientToEdit) {
            // Edit logic
            console.log("Editing client:", clientToEdit);
            const response = await axios.put(
                `${API_URL}/clients/${clientToEdit._id}`,
                newClient,
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                }
            );
            console.log("API Response for Edit:", response.data);
            setSuccessMessage("Client updated successfully!");
        } else {
            // Create logic
            console.log("Creating new client:", newClient);
            const response = await axios.post(`${API_URL}/clients/`, newClient, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            console.log("API Response for Create:", response.data);
            setSuccessMessage("Client added successfully!");
        }

        await fetchData(); 
        setShowForm(false);
        setClientToEdit(null);
        setIsEditing(false); 
    } catch (error) {
        console.error("Error during form submission:", error.response || error);
        setErrorMessage(
            error.response?.data?.message || "Failed to save the client."
        );
    }

    setNewClient({ name: "", email: "", phone: "", company: "" });
};

  const handleDetailsClick = (clientId) => {
    navigate(`/api/clientdetails/${clientId}`);
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

      {showForm && (
        <ClientForm
          clientData={newClient}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit} 
          buttonLabel={isEditing ? "Update Client" : "Add Client"}
          isEditing={isEditing} 
        />
      )}

      {!showForm && (
        <Grid container spacing={2}>
          {clients.map((client) => (
            <Grid key={client._id} item xs={12} sm={6} md={4}>
              <ClientCard client={client} 
              onDetailsClick={handleDetailsClick} 
              onEdit={handleEditClick} 

              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ClientsPage;
