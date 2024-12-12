// External Libraries
import { useContext } from "react";
// MUI Libraries
import { Avatar, Box, Button, Grid2, Paper, TextField, Typography } from "@mui/material";
// Internal Libraries
import { AuthContext } from "../../../context/auth.context.jsx";


function UserForm({ buttonLabel, handleCancel, handleFormSubmit, handleImageChange, handleInputChange }) {

  const { user } = useContext(AuthContext)


  return (
    <Grid2
  container
  alignItems="center"
  justifyContent="center"
  sx={{
    height: "100vh",
    backgroundColor: "#f5f5f5", 
  }}
>
  <Grid2 item xs={12} sm={10} md={8} lg={6}>
    <Paper
      sx={{
        padding: "48px", 
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
        textAlign: "center", 
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "32px" }}
      >
        {buttonLabel === "Save Changes" ? "Edit Profile" : "Create Profile"}
      </Typography>

      {/* Avatar */}
      {user && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              color: "white",
              fontSize: "80px", 
              width: "150px",
              height: "150px",
            }}
            alt="User Avatar"
            src={user.avatar ? user.avatar : ""}
          >
            {!user.avatar && user.name ? user.name[0].toUpperCase() : ""}
          </Avatar>
        </Box>
      )}
      <Button variant="text" component="label" sx={{ marginBottom: "24px" }}>
        + Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>

      {/* Form here */}
      <form onSubmit={handleFormSubmit}>
        <Grid2 container spacing={2}>
          {/* Name text field */}
          <Grid2 item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              required
            />
          </Grid2>

          {/* Email text field */}
          <Grid2 item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleInputChange}
              required
            />
          </Grid2>
        </Grid2>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", 
            marginTop: "32px",
          }}
        >
          {/* Cancel Button */}
          <Button
            onClick={handleCancel}
            variant="text"
            sx={{
              color: "gray",
            }}
          >
            Cancel
          </Button>

          {/* button for saving changes */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              padding: "10px 32px", 
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Save Changes
          </Button>
        </Box>
      </form>
    </Paper>
  </Grid2>
</Grid2>



  );
}

export default UserForm;