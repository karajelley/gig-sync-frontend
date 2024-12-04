// External Libraries 
import React, { useEffect, useState } from "react";
import axios from "axios";

// Internal Libraries / Components

// Styles / Assets
import './DashboardPage.css'

function DashboardPage() {
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
    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <ul>
{/*                 {clients.map((client) => (
                    <li key={client._id}>{client.name}</li>
                ))} */}
            </ul>
        </div>
    );
}

export default DashboardPage;
