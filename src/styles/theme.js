import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#342ED2", // Replace with your desired primary color
      light: "#63a4ff", // Optional: lighter shade of primary
      dark: "#004ba0",  // Optional: darker shade of primary
      contrastText: "#fff", // Optional: text color for primary buttons
    },
    secondary: {
      main: "#1EA6CC", // Replace with your desired secondary color
      light: "#ff6090", // Optional: lighter shade of secondary
      dark: "#b0003a",  // Optional: darker shade of secondary
      contrastText: "#fff", // Optional: text color for secondary buttons
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Customize typography if needed
  },
});

export default theme;
