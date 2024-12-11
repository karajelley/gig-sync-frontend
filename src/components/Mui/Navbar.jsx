// External Libraries 
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
// MUI Libraries
import {
  Box,
  CssBaseline,
  AppBar as MuiAppBar,
  Drawer as MuiDrawer,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Work as WorkIcon,
} from "@mui/icons-material";
// Internal Libraries / Components
import { AuthContext } from "../../context/auth.context.jsx";
import AvatarMenu from './Navigation/AvatarMenu.jsx';



const drawerWidth = 240;

const NAV_ITEMS = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/api/dashboard" },
  { text: "Projects", icon: <WorkIcon />, path: "/api/projectspage" },
  { text: "Clients", icon: <PeopleIcon />, path: "/api/clientspage" },
];


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));


const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});



function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user, logOutUser } = useContext(AuthContext)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
      >
        <Toolbar>
          {/* Hamburger Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Application Title */}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            gigSync
          </Typography>

          {/* User Greeting and Avatar */}
          <Box sx={{ display: "flex", alignItems: "center", padding: "0 16px" }}>
            {user && <Typography>Welcome, {user.name}</Typography>}
            {user && <AvatarMenu user={user} onLogout={logOutUser} onNavigate={navigate} />}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {/* Drawer Navigation Items */}
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}; export default Navbar;