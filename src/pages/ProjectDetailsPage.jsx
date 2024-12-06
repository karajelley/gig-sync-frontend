// External Libraries 
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom"; 
// Internal Libraries / Components
import { API_URL } from "../api/config";
import { AppContext } from "../../context/AppContext";
// Styles / Assets

function ProjectDetailsPage() {

    const { projectId } = useParams();
    const { projects, loading, fetchData } = useContext(AppContext);

    const [project, setProject] = useState(null);

    useEffect(() => {
        if (projects.length === 0 && !loading) {
            fetchData();
        }
    }, [projects, loading, fetchData]);

    

    if (loading) return <p>Loading project details...</p>;
    if (!project) return <p>Project not found</p>;

    return (
      <>
  
      </>
    )
  }
  
  export default ProjectDetailsPage;