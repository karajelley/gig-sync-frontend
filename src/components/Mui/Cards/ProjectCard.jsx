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
    <Box sx={{ minWidth: 350, margin: 2, position: "relative" }}>
  <Card
    variant="outlined"
    sx={{
      borderRadius: 4,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      padding: "16px",
      transition: "transform 0.2s ease-in-out", 
      "&:hover": {
        transform: "scale(1.03)", 
      },
      position: "relative",
    }}
  >
    {/* Status Indicator */}
    <Box
      sx={{
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: statusColors[project.status] || "gray", 
        position: "absolute",
        top: 10,
        right: 10,
      }}
    />

    <CardContent>
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontWeight: "bold",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {project.title || "Untitled Project"}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          color: "text.secondary",
          mb: 2,
          fontStyle: project.client?.name ? "normal" : "italic",
        }}
      >
        Client: {project.client?.name || "No client assigned"}
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        Budget: ${project.budget || "N/A"}
      </Typography>
      <Typography variant="body2">Status: {project.status || "Unknown"}</Typography>
    </CardContent>

    <CardActions
      sx={{
        display: "flex",
        justifyContent: "flex-end", 
        pt: 0,
      }}
    >
      <Button
        onClick={() => handleProjectEdit(project)}
        size="small"
        color="secondary"
        sx={{ textTransform: "capitalize", fontWeight: "bold" }}
      >
        Edit Project
      </Button>
      <Button
        size="small"
        onClick={() => handleDetailsClick(project._id)}
        color="secondary"
        sx={{ textTransform: "capitalize", fontWeight: "bold" }}
      >
        View Details
      </Button>
    </CardActions>
  </Card>
</Box>

  );
}

export default ProjectCard;