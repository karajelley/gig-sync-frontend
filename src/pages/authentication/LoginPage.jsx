// External Libraries 
import { useNavigate } from "react-router-dom";
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
  Link,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// Internal Libraries / Components
import { API_URL } from "../../api/config";
import { AuthContext } from "../../context/auth.context";
import LogoVertical from "../../assets/gigsync_logo_combo_vertical_50px.svg"
import OrganizingProjectsGraphic from "../../assets/organizing_projects_graphic_teal.svg"

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
        storeToken(response.data.authToken);
        return authenticateUser();
      })
      .then(()=>{
        navigate("/api/dashboard");

      })
      .catch((error) => {
        console.error("Login error:", error);
        const errorDescription =
          error.response?.data?.message || "An error occurred. Please try again.";
        setErrorMessage(errorDescription);
      });
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        background: "linear-gradient(to bottom, #1EA6CC, #390ED4)",
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 4,
        }}
      >
        {/* field for logo */}
        <Box
          component="img"
          src={LogoVertical}
          alt="Logo"
          sx={{ width: "200px", mt: 0, mb: 4 }}
        />
        <Typography variant="h5">
        Streamline Your Gigs, Simplify Your Life
        </Typography>
        {/* add image in this field */}
        <Box
          component="img"
          src={OrganizingProjectsGraphic}
          alt="Organizing Projetcs Graphic"
          sx={{ width: "100%", maxWidth: "400px", mt: 10, mb: 10 }}
        />
        {/* Footer text */}
        <Typography variant="body2" gutterBottom>
          Developed by:
        </Typography>
        {/* Developed by Kara */}
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          Kara Jelley: 
          <Link href="https://github.com/karajelley" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <GitHubIcon />
          </Link>
          <Link href="https://www.linkedin.com/in/karajelley" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <LinkedInIcon />
          </Link>
        </Typography>
        {/* Developer by Diego */}
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          Diego Cisneros: 
          <Link href="https://github.com/Kasper1-2" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <GitHubIcon />
          </Link>
          <Link href="https://www.linkedin.com/in/dfcisnerosg/" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <LinkedInIcon />
          </Link>
        </Typography>
      </Grid>

      {/* Right-hand side with form */}
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
              <Grid item>
                <Button onClick={handleSignUpClick} variant="text" size="small">
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