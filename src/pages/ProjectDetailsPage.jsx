// External Libraries 
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
// MUI Libraries
import { AppContext } from "../context/AppContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// Internal Libraries / Components
import { API_URL } from "../api/config";
import Alert from "../components/Mui/Modals/Alerts";
import ConfirmationDialog from "../components/Mui/Modals/ConfirmationDialog";
import ProjectForm from "../components/Mui/Forms/ProjectForm";



function ProjectDetailsPage() {

    const { id } = useParams();
    const [openDialog, setOpenDialog] = useState(false);

    const {
        clients,
        projects,
        isEditing,
        showForm,
        errorMessage,
        successMessage,
        setShowForm,
        setIsEditing,
        setErrorMessage,
        setSuccessMessage,
        fetchData,
        handleDeleteClick,
    } = useContext(AppContext);

    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");


    const project = projects.find((project) => project._id === id);


    const [newProject, setNewProject] = useState({
        title: project?.title || "",
        description: project?.description || "",
        budget: project?.budget || "",
        status: project?.status || "To Do",
        client: project?.client?._id || "",
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prevProject) => ({
            ...prevProject,
            [name]: value,
        }));
    };


    const handleDialogClose = () => {
        setOpenDialog(false);
    };


    const handleConfirmDelete = async () => {
        try {
            await handleDeleteClick("project", id);
            setSuccessMessage("Project deleted successfully!");
            setOpenDialog(false);
            fetchData();
            navigate("/api/projectspage");
        } catch (error) {
            console.error("Error during deletion:", error);
            setErrorMessage("Failed to delete the project.");
        }
    };
    const handleEditProject = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const response = await axios.put(`${API_URL}/projects/${id}`, newProject, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            console.log("Project updated successfully:", response.data);
            await fetchData();

            setSuccessMessage("Project updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error during project update:", error);

            if (error.response) {
                console.error("API Error Response:", error.response.data);
                setErrorMessage(
                    error.response.data.message || "Failed to update the project."
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

    if (!project) {
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
                    Project not found.
                </Typography>
            </Box>
        );
    }


    return (
        <Box sx={{ padding: "100px 20px 20px 140px" }}>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            {isEditing ? (
    <>
        <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditing(false)}
            sx={{ mb: 2 }}
        >
            Hide Form
        </Button>
        <ProjectForm
            projectData={newProject}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleEditProject}
            buttonLabel="Update Project"
            clients={clients}
        />
    </>
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
                <Typography variant="h4" gutterBottom>
                    {project.title || "Untitled Project"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Description: {project.description || "No description available."}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Budget: ${project.budget || "N/A"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Status: {project.status || "Unknown"}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Client: {project.client?.name || "No client assigned"}
                </Typography>
            </Box>
            <Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ ml: 2 }}
                >
                    Delete
                </Button>
            </Box>
        </Box>
    </>
)}

        

            <ConfirmationDialog
                open={openDialog}
                handleClose={handleDialogClose}
                handleConfirm={handleConfirmDelete}
                title="Delete Project?"
                description="Are you sure you want to delete this project? This action cannot be undone."
            />
        </Box>
    );
}; export default ProjectDetailsPage;