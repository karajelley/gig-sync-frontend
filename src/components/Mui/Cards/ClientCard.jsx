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
      <Card variant="outlined" sx={{ borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {client.name}
          </Typography>
          <Typography sx={{ color: "secondary", mb: 1.5 }}>
            {client.company || "No Company"}
          </Typography>
          <Typography variant="body2">Email: {client.email}</Typography>
          <Typography variant="body2">Phone: {client.phone}</Typography>
        </CardContent>
        <CardActions>
        <Button
            onClick={() => onEdit(client)}
            size="small"
            aria-label="Edit Client"
          >
            Edit Client
          </Button>
          <Button
            size="small"
            onClick={() => onDetailsClick(client._id)}
            aria-label="View Details"
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ClientCard;