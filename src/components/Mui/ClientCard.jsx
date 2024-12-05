// External Libraries 
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



// Internal Libraries / Components

// Styles / Assets



const ClientCard = ({ client }) => {
  return (
    <Box sx={{ minWidth: 275, margin: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          </Typography>
          <Typography variant="h5" component="div">
            {client.name}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            Company: {client.company || "No company specified"}
          </Typography>
          <Typography variant="body2">
            Email: {client.email}
          </Typography>
          <Typography variant="body2">
            Phone: {client.phone}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Edit Client</Button>
          <Button size="small">View Details</Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ClientCard;
