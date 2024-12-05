// External Libraries 
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";






// Internal Libraries / Components
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/auth.context";

// Styles / Assets
import './DashboardPage.css'


function DashboardPage() {

    const { clients, projects, loading } = useContext(AppContext);
    const { logOutUser } = useContext(AuthContext);

    if (loading) {
        return <p>Loading...</p>;
    }

                            /////////////////

    /* const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                console.log("Fetching clients data..."); // Debug: Check if fetch function is called
                const response = await axios.get("https://gig-sync-api.vercel.app/api/clients");
                console.log("Fetched clients data:", response.data); // Debug: Log fetched data
                setClients(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching clients:", error); // Debug: Log error if fetching fails
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        console.log("Component is loading..."); // Debug: Check loading state
        return <p>Loading...</p>;
    }

    console.log("Rendering clients data:", clients); // Debug: Log the clients data just before rendering
 */
    
}

export default DashboardPage;
