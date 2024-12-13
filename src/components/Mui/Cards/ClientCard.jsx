// External Libraries 
import * as React from "react";
// MUI Libraries
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
// Internal Libraries / Components



function ClientCard({ client, onDetailsClick, onEdit }) {

  return (
    <Box sx={{ minWidth: 350, margin: 0 }}>
      <Card
        variant="outlined"
        sx={{
          borderRadius: 4,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
          padding: "16px",
          transition: "transform 0.2s ease-in-out", 
          "&:hover": {
            transform: "scale(1.03)", 
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {client.name}
          </Typography>
  
          <Typography
            variant="subtitle2"
            sx={{
              color: "text.secondary",
              mb: 2,
              fontStyle: client.company ? "normal" : "italic",
            }}
          >
            {client.company || "No Company"}
          </Typography>
  
          <Typography variant="body2" sx={{ mb: 1 }}>
            Email: {client.email}
          </Typography>
          <Typography variant="body2">Phone: {client.phone}</Typography>
        </CardContent>
  
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "flex-end", 
            pt: 0,
          }}
        >
          <Button
            onClick={() => onEdit(client)}
            size="small"
            color="secondary"
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            Edit Client
          </Button>
          <Button
            size="small"
            onClick={() => onDetailsClick(client._id)}
            color="secondary"
            sx={{ textTransform: "capitalize", fontWeight: "bold" }}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
  
}

export default ClientCard;