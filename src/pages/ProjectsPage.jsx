import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import ProjectForm from "../components/Mui/ProjectForm";
import ConfirmationDialog from "../components/Mui/ConfirmationDialog";
import Alerts from "../components/Mui/Alerts";
import Kanban from "../components/Mui/Kanban";
import axios from "axios";
import { API_URL } from "../api/config";


function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]); // Add state for clients
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    budget: "",
    status: "In Progress",
    client: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  const getProjects = () => {
    axios
      .get(`${API_URL}/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Ensure the clients array is available before processing projects
        if (clients && clients.length > 0) {
          const validClients = clients.map((client) => client._id); // Get valid client IDs
  
          // Map through projects and clean invalid client values
          const cleanedProjects = response.data.map((project) => ({
            ...project,
            client: validClients.includes(project.client) ? project.client : "", // Set client to empty if invalid
          }));
  
          setProjects(cleanedProjects); // Update state with cleaned projects
        } else {
          setProjects(response.data); // If no clients are loaded, set projects as-is
        }
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
  };
  
  useEffect(() => {
    getClients();
  }, []);

  const getClients = () => {
    axios
      .get(`${API_URL}/clients`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log("Fetched clients:", response.data); // Log fetched clients
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
  
    if (isEditing && projectToEdit) {
      // Update an existing project
      try {
        const response = await axios.put(
          `${API_URL}/projects/${projectToEdit}`,
          newProject,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
  
        const updatedProject = response.data;
  
        // Optionally fetch the full client object for the updated project
        const fullClient =
          typeof updatedProject.client === "string"
            ? await axios
                .get(`${API_URL}/clients/${updatedProject.client}`, {
                  headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((res) => res.data)
                .catch(() => null)
            : updatedProject.client;
  
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === projectToEdit
              ? { ...updatedProject, client: fullClient || updatedProject.client }
              : project
          )
        );
  
        setSuccessMessage("Project updated successfully!");
        setShowForm(false);
        setIsEditing(false);
        setProjectToEdit(null);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to update the project."
        );
      }
    } else {
      // Add a new project
      try {
        const response = await axios.post(
          `${API_URL}/projects`,
          { ...newProject, client: newProject.client?._id || newProject.client },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );
  
        const newProjectData = response.data.project;
  
        // Optionally fetch the full client object for the new project
        const fullClient =
          typeof newProjectData.client === "string"
            ? await axios
                .get(`${API_URL}/clients/${newProjectData.client}`, {
                  headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((res) => res.data)
                .catch(() => null)
            : newProjectData.client;
  
        setProjects((prevProjects) => [
          ...prevProjects,
          { ...newProjectData, client: fullClient || newProjectData.client },
        ]);
  
        setSuccessMessage("Project added successfully!");
        setShowForm(false);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to add the project."
        );
      }
    }
  
    // Reset the form fields
    setNewProject({
      title: "",
      description: "",
      budget: "",
      status: "To Do",
      client: "",
    });
  };
  
  const handleEditClick = (project) => {
    setNewProject({
      title: project.title || "",
      description: project.description || "",
      budget: project.budget || "",
      status: project.status !== undefined ? project.status : "To Do",
      client: project.client?._id || project.client || "", // Ensure client ID is set
    });
    setProjectToEdit(project._id);
    setIsEditing(true);
    setShowForm(true);
  };
  
  const handleClientUpdate = (updatedClient) => {
    // Update clients state
    setClients((prevClients) =>
      prevClients.map((client) =>
        client._id === updatedClient._id ? updatedClient : client
      )
    );
  
    // Update projects where client matches
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.client === updatedClient._id
          ? { ...project, client: updatedClient }
          : project
      )
    );
  
    setSuccessMessage("Client updated successfully!");
  };
  

  const handleDeleteClick = (projectId) => {
    setProjectToDelete(projectId);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setProjectToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      axios
        .delete(`${API_URL}/projects/${projectToDelete}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => {
          setProjects((prevProjects) =>
            prevProjects.filter((project) => project._id !== projectToDelete)
          );
          setSuccessMessage("Project deleted successfully!");
        })
        .catch((error) => {
          setErrorMessage(
            error.response?.data?.message || "Failed to delete the project."
          );
        })
        .finally(() => {
          setOpenDialog(false);
          setProjectToDelete(null);
        });
    }
  };

  return (
    <Box
      sx={{
        marginTop: "60px",
        marginLeft: 8,
        transition: "margin-left 0.3s",
        padding: 2.0,
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
          Projects
        </Typography>
        <Alerts errorMessage={errorMessage} successMessage={successMessage} />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShowForm((prev) => !prev);
            setIsEditing(false);
            setProjectToEdit(null);
            setNewProject({
              title: "",
              description: "",
              budget: "",
              status: "In Progress",
              client: "",
            });
          }}
          sx={{ mb: 4 }}
        >
          {showForm ? "Hide Form" : "Create Project"}
        </Button>
      </Box>

      {showForm && (
        <ProjectForm
          clients={clients}
          projectData={newProject}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          buttonLabel={isEditing ? "Update Project" : "Add Project"}
        />
      )}

      {!showForm && (
        <Kanban
        projects={projects}
        onProjectUpdate={(updatedProjects) => setProjects(updatedProjects)}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        apiUrl={API_URL} // Pass API URL
        storedToken={storedToken} // Pass stored token
        />
      )}

      <ConfirmationDialog
        open={openDialog}
        handleClose={handleDialogClose}
        handleConfirm={handleConfirmDelete}
        title={"Delete Project?"}
        description={"Are you sure you want to delete this project? This action cannot be undone."}
      />
    </Box>
  );
}

export default ProjectsPage;
