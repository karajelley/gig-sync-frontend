import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Box, Typography } from "@mui/material";

function ClientDetailsPage() {
    const { id } = useParams(); 
    const { clients } = useContext(AppContext); 


    console.log("ID from URL:", id);
    console.log("Clients in context:", clients);

    
    const client = clients.find((client) => client._id === id);

    console.log("Matched client:", client);
    if (!client) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" color="error">
                    Client not found.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", 
                textAlign: "center", 
            }}
        >
            <Typography variant="h4" gutterBottom>
                {client.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Email: {client.email}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Phone: {client.phone}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Company: {client.company || "No company specified"}
            </Typography>
            {/* <Typography variant="h6" gutterBottom>
                Company: {client.projects || "No company specified"}
            </Typography> */}
        </Box>
    );
};
  
  export default ClientDetailsPage;