// External Libraries
import { useContext } from "react";
// MUI Libraries
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
// Internal Libraries
import { AuthContext } from "../../../context/auth.context.jsx";


function UserForm({ buttonLabel, handleCancel, handleFormSubmit, handleImageChange, handleInputChange }) {

  const { user } = useContext(AuthContext)


  return (
    <Grid
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
      alignItems="center"
      container
      justifyContent="center"
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom>
            {buttonLabel === "Save Changes" ? "Edit Profile" : "Create Profile"}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              {/* Avatar */}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                {user && (
                  <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        color: "white",
                        fontSize: 60,
                        width: 120,
                        height: 120,
                      }}
                      alt="User Avatar"
                      src={user.avatar ? user.avatar : ""}
                    >
                      {!user.avatar && user.name ? user.name[0].toUpperCase() : ""}
                    </Avatar>
                  </Box>
                )}
                <Button variant="text" component="label" sx={{ marginTop: 0, marginBottom: 1 }}>
                  + Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
              </Grid>

              {/* Name */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              {/* Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  width: "100%",
                  mt: 2,
                }}
              >
                {/* Cancel Button */}
                <Button
                  onClick={handleCancel}
                  variant="text"
                  sx={{
                    color: "primary",
                    borderColor: "gray",
                    mr: 2,
                  }}
                >
                  Cancel
                </Button>

                {/* Save Changes Button */}
                <Button
                  sx={{
                    backgroundColor: "primary.main",
                    width: "auto",
                    px: 3,
                  }}
                  onClick={handleFormSubmit}
                  variant="contained"
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserForm;