import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../api/config";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const fetchData = () => {
        setLoading(true);
        setErrorMessage(null);
        const storedToken = localStorage.getItem("token"); 

        Promise.all([
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
        .catch((error) => {
            if (error.response) {
                setErrorMessage(
                    error.response.data.message || "An unknown error occurred."
                );
            } else if (error.request) {
                setErrorMessage(
                    "No response from the server. Please try again later."
                );
            } else {
                setErrorMessage("An error occurred: " + error.message);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    };



    return (
        <AppContext.Provider value={{ projects, clients, loading, errorMessage, fetchData }}>
            {children}
        </AppContext.Provider>
    );
};
