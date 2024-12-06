// External Libraries 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
// Internal Libraries / Components
import { API_URL } from "../api/config";
// Styles / Assets

function ProjectDetailsPage() {

    const { projectId } = useParams();

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    if (loading) return <p>Loading product details...</p>;

    return (
      <>
  
      </>
    )
  }
  
  export default ProjectDetailsPage;