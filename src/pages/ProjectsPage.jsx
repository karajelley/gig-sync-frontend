// External Libraries
import { AppContext } from "../context/AppContext";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
// MUI Libraries
import Alerts from "../components/Mui/Modals/Alerts";
import Kanban from "../components/Mui/Kanban";
import ProjectForm from "../components/Mui/Forms/ProjectForm";
import { use } from "react";
// Internal Libraries / Components

function ProjectsPage() {
  const {
    API_URL,
    clients,
    fetchData,
    projects,
    setProjects,
    showForm,
    setShowForm,
  } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    budget: "",
    status: "In Progress",
    client: "",
  });

  useEffect(() => {
    setShowForm(false);
    setIsEditing(false);
    fetchData();
  }, [fetchData]);

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

    try {
      if (isEditing && projectToEdit) {
        // edit project logic
        const response = await axios.put(
          `${API_URL}/projects/${projectToEdit}`,
          newProject,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        setSuccessMessage("Project updated successfully!");
      } else {
        // create new project logic
        await axios.post(`${API_URL}/projects`, newProject, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setSuccessMessage("Project added successfully!");
      }

      await fetchData();

      setShowForm(false);
      setIsEditing(false);
      setProjectToEdit(null);
      setNewProject({
        title: "",
        description: "",
        budget: "",
        status: "To Do",
        client: "",
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while saving the project."
      );
    }
  };

  const handleProjectEdit = (project) => {
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
          Projects
        </Typography>
        <Alerts errorMessage={errorMessage} successMessage={successMessage} />

        <Button
          variant={showForm ? "outlined" : "contained"}
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
          {showForm ? "Cancel" : "Create Project"}
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
          handleProjectEdit={handleProjectEdit}
          apiUrl={API_URL}
          storedToken={storedToken}
        />
      )}
    </Box>
  );
}
export default ProjectsPage;
