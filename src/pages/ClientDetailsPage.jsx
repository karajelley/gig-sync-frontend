// External Libraries 
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// MUI Libraries
import { AppContext } from "../context/AppContext";
import { Button, Box, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// Internal Libraries / Components
import Alerts from "../components/Mui/Modals/Alerts";
import ClientForm from "../components/Mui/Forms/ClientForm";
import ConfirmationDialog from "../components/Mui/Modals/ConfirmationDialog";



function ClientDetailsPage() {
  const { id } = useParams();
  const {
    API_URL,
    clients,
    isEditing,
    setIsEditing,
    showForm,
    setShowForm,
    fetchData,
  } = useContext(AppContext);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const client = clients.find((client) => client._id === id);

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const [openDialog, setOpenDialog] = useState(false);
  const [newClient, setNewClient] = useState({
    name: client?.name || "",
    email: client?.email || "",
    phone: client?.phone || "",
    company: client?.company || "",
  });

  useEffect(() => {
    return () => {
      setIsEditing(false); 
      setShowForm(false); 
      setSuccessMessage(""); 
      setErrorMessage(""); 
    };
  }, [setIsEditing, setShowForm]);



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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };


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
    <Box sx={{ padding: "100px 20px 20px 140px", overflow: "hidden" }}>
      {/* Alerts */}
      {successMessage && <Alerts severity="success">{successMessage}</Alerts>}
      {errorMessage && <Alerts severity="error">{errorMessage}</Alerts>}
  
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          Client
        </Typography>
      </Box>
  
      {/* Form and Client Details */}
      <Box>
        {isEditing ? (
          <Box>
            <Box sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "25px",
            }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setIsEditing(false)}
              sx={{ 
                mb: 2,
                
               }}
            >
              Cancel
            </Button>
            </Box>
  
            {/* Form */}
            <ClientForm
              clientData={newClient}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleEditClient}
              buttonLabel="Update Client"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                "& .MuiButton-root": {
                  minWidth: "100px",
                },
              }}
            />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Box>
              <Typography variant="h5" color="text.secondary">
                  {client.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Email: {client.email}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Phone: {client.phone}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Company: {client.company}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                sx={{ mb:2,
                  bottom: "120px"

                }}
              >
                Edit
              </Button>
            </Box>
  
            {/* Delete Section */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Delete Client
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }} gutterBottom>
                ⚠️ This will delete the client and all projects associated with them. This action cannot be undone.
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
          </>
        )}
      </Box>
  
      <ConfirmationDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleConfirm={handleConfirmDelete}
        title="Delete Client?"
        description="Are you sure you want to delete this client? This action cannot be undone."
      />
    </Box>
  );
  
};

export default ClientDetailsPage;