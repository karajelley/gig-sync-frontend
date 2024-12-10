import React, { createContext, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../api/config";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const navigate = useNavigate();

    const formatError = (error) => {
        if (error.response) {
            return error.response.data.message || "An unknown error occurred.";
        } else if (error.request) {
            return "No response from the server. Please try again later.";
        } else {
            return "An error occurred: " + error.message;
        }
    };

    

    const fetchData = useCallback(() => {
        setLoading(true);
        setErrorMessage(null);
        const storedToken = localStorage.getItem("authToken");

        return Promise.all([
            axios.get(`${API_URL}/projects`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            }),
            axios.get(`${API_URL}/clients`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            }),
        ])
            .then(([projectsRes, clientsRes]) => {
                setProjects(projectsRes.data);
                setClients(clientsRes.data);
            })
            .catch((error) => setErrorMessage(formatError(error)))
            .finally(() => setLoading(false));
    }, []); 

    const handleDetailsClick = (projectId) => {
        navigate(`/api/projectdetails/${projectId}`);
    };
    
    const handleDeleteClick = async (type, id) => {
        console.log("Deleting item:", { type, id }); 
        const storedToken = localStorage.getItem("authToken");
        
        try {
          await axios.delete(`${API_URL}/${type}s/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });
          setProjects((prev) => prev.filter((project) => project._id !== id)); 
          setClients((prev) => prev.filter((client) => client._id !== id)); 
          console.log(`${type} deleted successfully!`);
        } catch (error) {
          console.error(`Failed to delete ${type}:`, error);
          setErrorMessage(
            error.response?.data?.message || `Failed to delete the ${type}.`
          );
        }
      };
      
      
    
        
    return (
        <AppContext.Provider
            value={{
                projects,
                setProjects,
                clients,
                setClients,
                loading,
                errorMessage,
                setErrorMessage,
                fetchData,
                handleDetailsClick,
                handleDeleteClick,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
