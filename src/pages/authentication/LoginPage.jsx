// External Libraries 
import axios from "axios";
import React, { useState, useContext } from "react";
// MUI Libraries
import {
  Alert,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// Internal Libraries / Components
import { API_URL } from "../../api/config";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";



function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const { authenticateUser, storeToken } = useContext(AuthContext);
  
  const navigate = useNavigate();
  

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("Login successful:", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/api/dashboard");
      })
      .catch((error) => {
        console.error("Login error:", error);
        const errorDescription = error.response?.data?.message || "An error occurred. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  
  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #1976d2, #42a5f5)",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url(https://source.unsplash.com/featured/?technology,code)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleLoginSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePassword}
            />
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* Forgot Password Button */}
                {/*<Button href="#" variant="text" size="small">
                  Forgot password?
                </Button> */}
              </Grid>
              <Grid item>
                <Button href="/signup" variant="text" size="small">
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
