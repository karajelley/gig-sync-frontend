// External Libraries 
import { useContext } from "react";
// MUI Libraries
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Internal Libraries / Componentsimport * as React from "react";
import { AppContext } from "../../../context/AppContext";



function ProjectCard({ project, handleProjectEdit }) {

  const { handleDeleteClick, handleDetailsClick } = useContext(AppContext);


  return (
    <Box sx={{ minWidth: 275, margin: 2, position: "relative" }}>
      <Card variant="outlined" sx={{ position: "relative", borderRadius: 4, }}>
        {/* Delete Button */}
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
          onClick={() => handleDeleteClick("project", project._id)}
          aria-label="Delete Project"
        >
          <CloseIcon />
        </IconButton>

        {/* display the content */}
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


        {/* call functions to perform on click */}
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
  );
}

export default ProjectCard;