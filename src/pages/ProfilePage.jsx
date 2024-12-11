// External Libraries 
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// MUI Libraries
import { Avatar, Box, Button, Typography } from "@mui/material";
// Internal Libraries / Components
import { API_URL } from "../api/config"
import { AuthContext } from "../context/auth.context.jsx";
import ConfirmationDialog from "../components/Mui/Modals/ConfirmationDialog.jsx";
import UserForm from "../components/Mui/Forms/UserForm.jsx";



function ProfilePage() {

    // Feedback messages
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // UI state controls
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const { user, setUser, storeToken, logOutUser } = useContext(AuthContext);

    const navigate = useNavigate();


    const fetchUser = useCallback(() => {
        setLoading(true);
        setErrorMessage(null);
        const storedToken = localStorage.getItem("authToken");

        axios
            .get(`${API_URL}/auth/verify`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                const userData = response.data;
                setUser(userData);
            })
            .catch((error) => setErrorMessage(formatError(error)))
            .finally(() => setLoading(false));
    }, []);


    const formatError = (error) => {
        if (error.response) {
            return error.response.data.message || "An unknown error occurred.";
        } else if (error.request) {
            return "No response from the server. Please try again later.";
        } else {
            return "An error occurred: " + error.message;
        }
    };


    const handleCancel = () => {
        setShowForm(false);
    };


    const handleConfirmDelete = () => {
        const storedToken = localStorage.getItem("authToken");
        console.log("Stored Token:", storedToken);
        axios
            .delete(`${API_URL}/auth/delete`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then(() => {
                logOutUser();
                navigate("/login");
            })
            .catch((error) => {
                setErrorMessage(formatError(error));
            })
            .finally(() => {
                setOpenDialog(false);
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };


    const handleFormSubmit = (event) => {

        event.preventDefault();

        const storedToken = localStorage.getItem("authToken");

        axios
            .put(`${API_URL}/auth/users/${user._id}`, user, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                // 1. Update the user data in state
                setUser(response.data.updatedUser);
                // 2. Handle the new token (received from the backend)
                const newToken = response.data.authToken; // Make sure the backend sends the new token
                storeToken(newToken);
                setShowForm(false);
                setSuccessMessage("Profile updated successfully!");
            })
            .catch((error) => {
                setErrorMessage(formatError(error));
            });
    };


    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <Box sx={{ marginTop: "100px", marginLeft: "80px", marginRight: "32px", padding: 2 }}>
            {/* Conditional Rendering for Form and Profile */}
            {showForm ? (
                <UserForm
                    handleInputChange={handleInputChange}
                    handleFormSubmit={handleFormSubmit}
                    buttonLabel={"Save Changes"}
                    //handleImageChange={() => { /* image change logic */ }}
                    handleCancel={handleCancel}
                />
            ) : (
                user && (
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", mb: 4 }}>
                        {/* Profile and Edit Button in the same row */}
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                            mb: 4,
                        }}>
                            {/* Profile Title */}
                            <Typography variant="h3" sx={{ flex: 1 }} gutterBottom>
                                Profile
                            </Typography>

                            {/* Edit Button */}
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => setShowForm(true)}
                                sx={{
                                    alignSelf: "center",
                                }}
                            >
                                Edit Profile
                            </Button>
                        </Box>

                        {/* Avatar and User Information */}
                        <Avatar sx={{ bgcolor: "primary.main", color: "white", fontSize: 60, width: 120, height: 120, mb: 3 }}>
                            {user.name[0].toUpperCase()}
                        </Avatar>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            Name: {user?.name}
                        </Typography>
                        <Typography variant="h6">
                            Email: {user?.email}
                        </Typography>

                        {/* Delete Account Button and Dialog */}
                        <Box sx={{ mt: 6 }}>
                            <Typography variant="h5" gutterBottom>
                                Delete Account
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                ⚠ This will delete your account. This action cannot be undone.
                            </Typography>
                            <Button variant="outlined" color="error" onClick={() => setOpenDialog(true)}>
                                Delete Account
                            </Button>
                        </Box>

                        <ConfirmationDialog
                            open={openDialog}
                            handleClose={() => setOpenDialog(false)}
                            handleConfirm={handleConfirmDelete}
                            title={"Delete Account?"}
                            description={"Are you sure you want to delete your account? This action cannot be undone."}
                        />
                    </Box>
                )
            )}
        </Box>
    );


}; export default ProfilePage;