// External Libraries
import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
// MUI Libraries
import { AppContext } from "../context/AppContext";
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// Internal Libraries / Components
import Alerts from "../components/Mui/Modals/Alerts";
import ConfirmationDialog from "../components/Mui/Modals/ConfirmationDialog";
import ProjectForm from "../components/Mui/Forms/ProjectForm";
import ExpenseForm from "../components/Mui/Forms/ExpenseForm";

function ProjectDetailsPage() {
    const { id } = useParams();
    const [openDialog, setOpenDialog] = useState(false);
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [showForm, setShowForm] = useState(false);


    const {
        API_URL,
        clients,
        projects,
        isEditing,
        setIsEditing,
        fetchData,
        handleDeleteClick,
    } = useContext(AppContext);

    const navigate = useNavigate();

    const storedToken = localStorage.getItem("authToken");
    const project = projects.find((project) => project._id === id);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [newProject, setNewProject] = useState({
        title: project?.title || "",
        description: project?.description || "",
        budget: project?.budget || "",
        status: project?.status || "To Do",
        client: project?.client?._id || "",
    });

    const fetchProjectDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/projects/${id}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setExpenses(response.data.expenses || []);
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
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
            const response = await axios.put(
                `${API_URL}/projects/${id}`,
                newProject,
                {
                    headers: { Authorization: `Bearer ${storedToken}` },
                }
            );

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

    // handle for expenses
    const handleAddExpense = async (newExpense) => {
        try {
            const updatedExpenses = [...project.expenses, newExpense];
            const response = await axios.put(
                `${API_URL}/projects/${project._id}`,
                { ...project, expenses: updatedExpenses },
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );
            fetchProjectDetails();
            setExpenses(response.data.expenses);
            setShowExpenseForm(false);
        } catch (error) {
            console.error("Error adding expense:", error);
        }
    };

    // handle deleteing expenses

    const handleDeleteExpense = async (expenseId) => {
        try {
            const updatedExpenses = expenses.filter(
                (expense) => expense._id !== expenseId
            );

            const response = await axios.put(
                `${API_URL}/projects/${project._id}`,
                { ...project, expenses: updatedExpenses },
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            setExpenses(updatedExpenses);
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };

    useEffect(() => {
        return () => {
            setIsEditing(false); // Reset editing state
            setShowForm(false); // Reset form visibility
            setSuccessMessage(""); // Clear success messages
            setErrorMessage(""); // Clear error messages
        };
    }, [setIsEditing, setShowForm]);

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
                    Loading project details...
                </Typography>
            </Box>
        );
    }

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

    useEffect(() => {
        fetchProjectDetails();
    }, [id]);

    return (
        <Box sx={{ padding: "100px 20px 20px 140px" }}>
            {successMessage && <Alerts severity="success">{successMessage}</Alerts>}
            {errorMessage && <Alerts severity="error">{errorMessage}</Alerts>}

            {isEditing ? (
                <>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h3" gutterBottom>
                            Project
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginRight: "25px",
                    }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setIsEditing(false)}
                            sx={{ mb: 2 }}
                        >Cancel
                        </Button>
                    </Box>
                    <ProjectForm
                        projectData={newProject}
                        handleInputChange={(e) => {
                            const { name, value } = e.target;
                            setNewProject((prevProject) => ({
                                ...prevProject,
                                [name]: value,
                            }));
                        }}
                        handleFormSubmit={(e) => {
                            e.preventDefault();
                            handleEditProject(e);
                        }}
                        buttonLabel="Update Project"
                        clients={clients}
                    />
                </>
            ) : (
                <>
                    {/* Main content */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            mb: 4,
                        }}
                    >
                        {/* Project details */}
                        <Box>
                            <Typography variant="h4" gutterBottom>
                                {project.title || "Untitled Project"}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Description:{" "}
                                {project.description || "No description available."}
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

                        {/* Edit and Delete buttons */}
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </Button>
                        </Box>
                    </Box>

                    {/* Expenses section */}
                    <Box sx={{ marginTop: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Expenses
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setShowExpenseForm((prev) => !prev)}
                            sx={{ mb: 2 }}
                        >
                            {showExpenseForm ? "Hide Expense Form" : "Add Expense"}
                        </Button>

                        {showExpenseForm && (
                            <Box
                                sx={{
                                    width: "400px",
                                    marginLeft: 0,
                                    padding: 2,
                                    border: "1px solid #ccc",
                                    borderRadius: 2,
                                    boxShadow: 3,
                                }}
                            >

                                {/* expenses section */}
                                <ExpenseForm
                                    onAddExpense={handleAddExpense}
                                    onCancel={() => setShowExpenseForm(false)}
                                />
                            </Box>
                        )}

                        {expenses.length > 0 ? (
                            <List sx={{ maxWidth: "400px" }}>
                                {expenses.map((expense) => (
                                    <ListItem
                                        key={expense._id}
                                        sx={{
                                            border: "1px solid #ccc",
                                            borderRadius: 2,
                                            marginBottom: 1,
                                            padding: 1,
                                        }}
                                    >
                                        <ListItemText
                                            primary={`Description: ${expense.description}`}
                                            secondary={`Amount: $${expense.amount} | Category: ${expense.category}`}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handleDeleteExpense(expense._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No expenses available for this project.
                            </Typography>
                        )}
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
}
export default ProjectDetailsPage;
