// External Libraries 
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import axios from 'axios';
// Internal Libraries / Components

import ProjectCard from "../components/Mui/ProjectCard.jsx"
// Styles / Assets
import "../pages/ProjectsPage.css"


import { API_URL } from "../api/config";

function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");


    function getProjects() {

        const storedToken = localStorage.getItem('authToken');

        axios
        .get(`${API_URL}/projects`,
            { headers: { Authorization: `Bearer ${storedToken}`} }
        )
        .then((response) => {
            console.log(response.data)
            setProjects(response.data)
        })
        .catch((error) => {
            if (error.response) {
              setErrorMessage(error.response.data.message || "An unknown error occurred.");
            } else if (error.request) {
              setErrorMessage("No response from the server. Please try again later.");
            } else {
              setErrorMessage("An error occurred: " + error.message);
            }
          });
        
        }

    useEffect(() => {
        getProjects();
    }, []);


    return (
        <>
            <div className="projects-container">
                <h1>Projects</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProjectsPage;