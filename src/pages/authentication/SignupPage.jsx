// External Libraries 
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
// MUI Libraries
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  Alert,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// Internal Libraries / Components
import { API_URL } from "../../api/config";
import LogoVertical from "../../assets/gigsync_logo_combo_vertical_50px.svg"
import OrganizingProjectsGraphic from "../../assets/organizing_projects_graphic_teal.svg"




function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
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
        background: "linear-gradient(to bottom, #1EA6CC, #390ED4)",
      }}
    >
      {/* Left-hand side with gradient and new content */}
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
        {/* Logo */}
        <Box
          component="img"
          src={LogoVertical}
          alt="Logo"
          sx={{ width: "200px", mt: 0, mb: 4 }}
        />
        <Typography variant="h5">
        Streamline Your Gigs, Simplify Your Life
        </Typography>
        {/* Graphic of worker */}
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
        {/* Developer 1 */}
        <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
          Kara Jelley: 
          <Link href="https://github.com/karajelley" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <GitHubIcon sx={{ color: "white", ml:1 }}/>
          </Link>
          <Link href="https://www.linkedin.com/in/karajelley" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <LinkedInIcon sx={{ color: "white", ml:1 }}/>
          </Link>
        </Typography>
        {/* Developer 2 */}
        <Typography varixant="body2" sx={{ display: "flex", alignItems: "center" }}>
          Diego Cisneros: 
          <Link href="https://github.com/Kasper1-2" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <GitHubIcon sx={{ color: "white", ml:1 }}/>
          </Link>
          <Link href="https://www.linkedin.com/in/dfcisnerosg/" target="_blank" color="inherit" sx={{ ml: 1 }}>
            <LinkedInIcon sx={{ color: "white", ml:1 }}/>
          </Link>
        </Typography>
      </Grid>

      {/* Right-hand side with login form */}
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
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignupSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={handleName}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignupPage;
