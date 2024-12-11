// External Libraries 
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
// MUI Libraries
import { Box, Button, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
// Internal Libraries / Components
import { AuthContext } from "../context/auth.context";



function NotFoundPage() {

  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();


  const handleButtonClick = () => {
    navigate(isLoggedIn ? '/api/dashboard' : '/login');
  };


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
        padding: 3,
      }}
    >
      <SentimentDissatisfiedIcon sx={{ fontSize: 100, color: '#1976d2', marginBottom: 2 }} />
      <Typography variant="h3" component="h1" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Sorry, the page you are looking for does not exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        sx={{ marginTop: 2 }}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;