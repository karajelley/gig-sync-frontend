import * as React from "react";
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

function ProjectCard({ client, project, handleEditClick, handleDeleteClick }) {
  return (
    <Box sx={{ minWidth: 275, margin: 2, position: "relative" }}>
      <Card variant="outlined" sx={{ position: "relative", borderRadius: 4 }}>
      
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
          onClick={() => handleDeleteClick(project._id)}
        >
          <CloseIcon />
        </IconButton>

        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          ></Typography>
          <Typography variant="h5" component="div">
            {project.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Status: {project.status}
          </Typography>
{/*           <Typography variant="body2">
            Description: {project.description}
          </Typography> */}
          <Typography variant="body2">Budget: ${project.budget}</Typography>
          <Typography variant="body2">
            Client: {project.client || "No client assigned"}
          </Typography>
        </CardContent>

        <CardActions>
          <Button onClick={() => handleEditClick(project)} size="small">
            Edit Project
          </Button>
          <Button size="small">View Details</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ProjectCard;
