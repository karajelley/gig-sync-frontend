import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

function ProjectCard({ project }) {
  return (
    <Card
      sx={{
        height: "100%", // Ensures all cards are equal height
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {project.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {project.description || "No description available"}
        </Typography>
        <Box sx={{ mt: "auto" }}>
          <Typography variant="body1">Budget: ${project.budget}</Typography>
          <Typography variant="body2" color="primary">
            Status: {project.status}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProjectCard;
