import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  Alert,
  MenuItem,
} from "@mui/material";
import { Grid } from "@mui/system";
import axios from "axios";
import ProjectCard from "../components/Mui/ProjectCard.jsx";
import "../pages/ProjectsPage.css";
import { API_URL } from "../api/config";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    budget: "",
    status: "In Progress", // Default value
    client: "", // This will hold the client ID
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]); // To populate the client dropdown

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

  const getClients = () => {
    axios
      .get(`${API_URL}/clients`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setClients(response.data); // Populate client dropdown
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  };

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

    axios
      .post(`${API_URL}/projects`, newProject, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setProjects((prevProjects) => [...prevProjects, response.data]);
        setNewProject({
          title: "",
          description: "",
          budget: "",
          status: "In Progress",
          client: "",
        }); // Reset form
        setSuccessMessage("Project added successfully!");
        setShowForm(false); // Hide form after submission
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(
            error.response.data.message || "Failed to add the project."
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
    getClients(); // Fetch clients for the dropdown
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
  <Typography variant="h4" gutterBottom>
    Projects
  </Typography>
  {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
  {successMessage && <Alert severity="success">{successMessage}</Alert>}

  {/* Toggle Form Button */}
  <Button
    variant="contained"
    color="primary"
    onClick={() => setShowForm((prev) => !prev)}
    sx={{ mb: 4 }}
  >
    {showForm ? "Hide Form" : "Create Project"}
  </Button>

  {/* Add New Project Form */}
  {showForm ? (
    <Paper sx={{ padding: 3, marginBottom: 4 }}>
      <Typography variant="h6" gutterBottom>
        Add New Project
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newProject.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Budget"
              name="budget"
              type="number"
              value={newProject.budget}
              onChange={handleInputChange}
              required
              inputProps={{ min: 0 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={newProject.status}
              onChange={handleInputChange}
            >
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Client"
              name="client"
              value={newProject.client}
              onChange={handleInputChange}
              required
            >
              {clients.map((client) => (
                <MenuItem key={client._id} value={client._id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Add Project
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  ) : (
    // Only show the projects list when the form is hidden
    <Grid container spacing={2}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project._id}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  )}
</Box>

  );
}

export default ProjectsPage;
