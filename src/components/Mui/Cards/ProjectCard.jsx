// External Libraries 
import { useContext } from "react";
// MUI Libraries
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
// Internal Libraries / Componentsimport * as React from "react";
import { AppContext } from "../../../context/AppContext";


function ProjectCard({ project, handleProjectEdit }) {
  const statusColors = {
    "To Do": "#D40ED4",  
    "In Progress": "#0E1BD4",
    "Completed": "#2D9B6F", 
  };
  const { handleDetailsClick } = useContext(AppContext);


  return (
    <Box sx={{ minWidth: 275, margin: 2, position: "relative" }}>
     <Box sx={{ minWidth: 275, margin: 2, position: "relative" }}>
  <Card
    variant="outlined"
    sx={{
      position: "relative",
      borderRadius: 4,
    }}
  >
    {/* Status Indicator */}
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: statusColors[project.status] || "gray", // Default color if status is unknown
        position: "absolute",
        top: 10,
        right: 10,
      }}
    />

    {/* Display the content */}
    <CardContent>
      <Typography
        variant="h5"
        component="div"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {project.title || "Untitled Project"}
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
        Status: {project.status || "Unknown"}
      </Typography>
      <Typography variant="body2">
        Budget: ${project.budget || "N/A"}
      </Typography>
      <Typography variant="body2">
        Client: {project.client?.name || "No client assigned"}
      </Typography>
    </CardContent>

    {/* Call functions to perform on click */}
    <CardActions>
      <Button
        onClick={() => handleProjectEdit(project)}
        size="small"
        aria-label="Edit Project"
      >
        Edit Project
      </Button>
      <Button size="small" onClick={() => handleDetailsClick(project._id)}>
        View Details
      </Button>
    </CardActions>
  </Card>
</Box>
    </Box>
  );
}

export default ProjectCard;