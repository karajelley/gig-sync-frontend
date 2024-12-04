import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    const backendUrl = "https://gig-sync-api.vercel.app"; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ projectsRes, clientsRes] = await Promise.all([
                    axios.get(`${backendUrl}/api/projects`), 
                    axios.get(`${backendUrl}/api/clients`),   
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
