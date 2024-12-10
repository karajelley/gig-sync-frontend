import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Box, Typography } from "@mui/material";

function ProjectDetailsPage() {
    const { id } = useParams(); // Extract the project ID from the URL
    const { projects } = useContext(AppContext); // Access projects from context

    // Find the project with the matching ID
    const project = projects.find((project) => project._id === id);

    // Handle case where project is not found
    if (!project) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" color="error">
                    Project not found.
                </Typography>
            </Box>
        );
    }

    // Render project details
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Center content vertically
                textAlign: "center", // Center text alignment
            }}
        >
            <Typography variant="h4" gutterBottom>
                {project.title || "Untitled Project"}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Description: {project.description || "No description available"}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Budget: ${project.budget || "N/A"}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Status: {project.status || "Unknown"}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Client: {project.client?.name || "No client assigned"}
            </Typography>
        </Box>
    );
}

export default ProjectDetailsPage;
