import { AppContext } from "../context/AppContext";
import { Box, Button, Typography } from "@mui/material";
import { useContext, useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Alerts from "../components/Mui/Alerts";
import axios from "axios";
import ConfirmationDialog from "../components/Mui/ConfirmationDialog";
import Kanban from "../components/Mui/Kanban";
import ProjectForm from "../components/Mui/ProjectForm";
// Internal Libraries / Components
import { API_URL } from "../api/config";


function ProjectsPage() {
  const { projects, setProjects, clients, setClients, errorMessage, setErrorMessage, fetchData } = useContext(AppContext);

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    budget: "",
    status: "In Progress",
    client: "",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate(); 


  useEffect(() => {
    fetchData(); 
  }, [fetchData]);


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
        // Edit Logic
        axios
            .put(`${API_URL}/projects/${projectToEdit}`, newProject, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                console.log("Response from API (Edit):", response.data);

                const updatedProject = response.data;
                const clientObject = clients.find((client) => client._id === updatedProject.client);
                if (clientObject) {
                    updatedProject.client = clientObject;
                }

                setProjects((prevProjects) =>
                    prevProjects.map((project) =>
                        project._id === projectToEdit ? updatedProject : project
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
        // Create Logic
        axios
            .post(`${API_URL}/projects`, newProject, {
                headers: { Authorization: `Bearer ${storedToken}` },
            })
            .then((response) => {
                console.log("Response from API (Create):", response.data);

                const createdProject = response.data;
                const clientObject = clients.find((client) => client._id === createdProject.client);
                if (clientObject) {
                    createdProject.client = clientObject;
                }

                setProjects((prevProjects) => [...prevProjects, createdProject]);
                setSuccessMessage("Project added successfully!");
                setShowForm(false);
                fetchData(); // can be use optionally to get all the information but its not optimal
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
  

const handleProjectEdit = (project) => {
  console.log("Project client:", project.client);
  setNewProject({
      title: project.title || "",
      description: project.description || "",
      budget: project.budget || "",
      status: project.status || "To Do",
      client: project.client?._id || "",
  });
  setProjectToEdit(project._id);
  setIsEditing(true);
  setShowForm(true);
};


  const handleDetailsClick = (project) => {
    navigate(`/api/projectdetails/${project._id}`);
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
      {showForm && console.log("Form Props:", { projectData: newProject, clients })}
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
        handleProjectEdit={handleProjectEdit} 
        apiUrl={API_URL}
        storedToken={storedToken}
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
