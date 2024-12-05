import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

import ClientCard from "../components/mui/ClientCard";

import { API_URL } from "../api/config";


export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ projectsRes, clientsRes] = await Promise.all([
                    axios.get(`${API_URL}/projects`), 
                    axios.get(`${API_URL}/clients`),   
                ]);

                setProjects(projectsRes.data);
                setClients(clientsRes.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <AppContext.Provider value={{ projects, clients, loading }}>
            {children}
        </AppContext.Provider>
    );
};
