import * as React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { positions } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

function ProjectCard({ project, handleProjectEdit}) {
  const {handleDeleteClick, handleDetailsClick } = useContext(AppContext);

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
          onClick={() => handleDeleteClick(project._id)}
          aria-label="Delete Project"
        >
          <CloseIcon />
        </IconButton>

        {/* Card Content */}
        <CardContent>
  <Typography
    variant="h5"
    component="div"
    sx={{
      whiteSpace: "nowrap",       // Prevent text from wrapping
      overflow: "hidden",         // Hide overflow text
      textOverflow: "ellipsis",   // Add ellipsis (...) for overflow
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


        {/* Card Actions */}
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