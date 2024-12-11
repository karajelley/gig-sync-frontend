// External Libraries 
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"; 
// MUI Libraries
// Internal Libraries / Components
import { API_URL } from "../api/config";
import { AppContext } from "../context/AppContext";

function ProjectDetailsPage() {

    const { id } = useParams();
    const { projects, setProjects, clients, loading, errorMessage, setErrorMessage, fetchData } = useContext(AppContext);

    useEffect(() => {
        fetchData(); 
      }, [fetchData]);

    

    if (loading) return <p>Loading project details...</p>;
    if (!project) return <p>Project not found</p>;

    return (
      <>
            <div>
                <h2>{id?.title}</h2>
                <p>{project?.description}</p>
                <p>Client: {project?.client?.name}</p>
            </div>
      </>
    )
  }
  
  export default ProjectDetailsPage;