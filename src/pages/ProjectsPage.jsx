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
        setProjects(response.data);
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
    getProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (isEditing && projectToEdit) {
      axios
        .put(`${API_URL}/projects/${projectToEdit}`, newProject, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project._id === projectToEdit ? response.data : project
            )
          );
          setSuccessMessage("Project updated successfully!");
          setShowForm(false);
          setIsEditing(false);
          setProjectToEdit(null);
        })
        .catch((error) => {
          setErrorMessage(
            error.response?.data?.message || "Failed to update the project."
          );
        });
    } else {
      axios
        .post(`${API_URL}/projects`, newProject, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setProjects((prevProjects) => [...prevProjects, response.data]);
          setSuccessMessage("Project added successfully!");
          setShowForm(false);
        })
        .catch((error) => {
          setErrorMessage(
            error.response?.data?.message || "Failed to add the project."
          );
        });
    }
    setNewProject({
      title: "",
      description: "",
      budget: "",
      status: "In Progress",
      client: "",
    });
  };

  const handleEditClick = (project) => {
    setNewProject({
      title: project.title,
      description: project.description,
      budget: project.budget,
      status: project.status,
      client: project.client,
    });
    setProjectToEdit(project._id);
    setIsEditing(true);
    setShowForm(true);
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
          handleEditClick={handleEditClick} // Pass edit handler
          handleDeleteClick={handleDeleteClick} // Pass delete handler
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
