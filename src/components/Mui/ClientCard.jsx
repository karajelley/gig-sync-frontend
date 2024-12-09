import React from "react";
import { Box, Card, CardContent, CardActions, Button, IconButton, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

function ClientCard ({ client, handleEditClick, handleDeleteClick, onDetailsClick }) {


  return (
    <Box sx={{ minWidth: 275, margin: 2, position: "relative" }}>
      <Card variant="outlined" sx={{ position: "relative", borderRadius: 4 }}>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
          }}
          
          
          onClick={() => handleDeleteClick(client._id)}
        >
          <CloseIcon />
        </IconButton>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          ></Typography>
          <Typography variant="h5" component="div">
            {client.name}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            Company: {client.company || "No company specified"}
          </Typography>
          <Typography variant="body2">Email: {client.email}</Typography>
          <Typography variant="body2">Phone: {client.phone}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => handleEditClick(client)}>
            Edit Client
          </Button>
          <Button size="small"  onClick={() => onDetailsClick(client._id)}>View Details</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ClientCard;
