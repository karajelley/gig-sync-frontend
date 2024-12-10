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

    const handleEditClick = (project) => {
        navigate(`/api/projectedit/${project._id}`, { state: { project } }); // Navigate to edit page with project data
    };

    const handleDeleteClick = async (projectId) => {
        const storedToken = localStorage.getItem("authToken");
    
        try {
            await axios.delete(`${API_URL}/projects/${projectId}`, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
    
            // Update the projects in the global state
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project._id !== projectId)
            );
        } catch (error) {
            // Handle the error gracefully
            setErrorMessage(formatError(error));
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
                handleEditClick, 
                handleDeleteClick,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
