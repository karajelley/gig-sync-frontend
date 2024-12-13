// External Libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// MUI Libraries
import { Box, Button, Grid, Typography } from "@mui/material";
// Internal Libraries / Components
import { API_URL } from "../api/config";
import { AppContext } from "../context/AppContext";
import Alerts from "../components/Mui/Modals/Alerts";
import ClientCard from "../components/Mui/Cards/ClientCard";
import ClientForm from "../components/Mui/Forms/ClientForm";



function ClientsPage() {
  const {
    clients,
    showForm,
    setShowForm,
    isEditing,
    setIsEditing,
    errorMessage,
    setErrorMessage,
    fetchData,
  } = useContext(AppContext);

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [clientToEdit, setClientToEdit] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");


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

  const handleClientForm = async (e) => {
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
        marginTop: "100px",
        marginLeft: "140px",
        marginRight: "76px",
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
        <Typography variant="h3" gutterBottom>
          Clients
        </Typography>
        <Alerts errorMessage={errorMessage} successMessage={successMessage} />

        <Button
          variant={showForm ? 'outlined' : 'contained'}
          color="primary"
          onClick={() => {
            setShowForm((prev) => !prev);
            setIsEditing(false);
            setClientToEdit(null);
            setNewClient({ name: "", email: "", phone: "", company: "" });
          }}
          sx={{ mb: 4 }}
        >
          {showForm ? "Cancel" : "Create Client"}
        </Button>
      </Box>

      {showForm && (
        <ClientForm
          clientData={newClient}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleClientForm}
          buttonLabel={isEditing ? "Update Client" : "Add Client"}
          isEditing={isEditing}
        />
      )}

      {!showForm && (
        <Grid container spacing={4}>
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
}; export default ClientsPage;