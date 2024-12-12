import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#342ED2", // Primary color
      light: "#646AF0", // Lighter shade of primary
      dark: "#1F1BA1",  // Darker shade of primary
      contrastText: "#ffffff", // Text color for primary buttons
    },
    secondary: {
      main: "#1EA6CC", // Secondary color
      light: "#61C3E0", // Lighter shade of secondary
      dark: "#137A99",  // Darker shade of secondary
      contrastText: "#ffffff", // Text color for secondary buttons
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Default font family
  },
});

export default theme;
