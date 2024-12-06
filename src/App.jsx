// External Libraries 
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AppProvider } from "./context/AppContext.jsx";


// Internal Libraries / Components
import DashboardPage from "./pages/DashboardPage.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Mui/Navbar.jsx";
import LandingPage from "./pages/authentication/LandingPage.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SignupPage from './pages/authentication/SignupPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ClientsPage from "./pages/ClientsPage.jsx";
import IsPrivate from "./components/IsPrivate.jsx";
import isAnon from "./components/isAnon.jsx";


// Styles / Assets
import './App.css'


function App() {

  const location = useLocation();

  // Define routes where Navbar/Sidebar should be hidden
  const hideNavbarRoutes = ["/login", "/signup"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <AppProvider>
      {!hideNavbar && <Navbar />}
      
      <Routes>
          <Route path="*" element={<NotFoundPage />} />  
          <Route path="/" element={<LandingPage />} />
          <Route path="/api/dashboard" element={<DashboardPage />} /> 
          <Route path="/api/projectspage" element={<IsPrivate><ProjectsPage /></IsPrivate>} />
          <Route path="/api/clientspage" element={<IsPrivate><ClientsPage /></IsPrivate>} />
          <Route path="/login" element={<isAnon><LoginPage /></isAnon>} />
          <Route path="/signup" element={<isAnon><SignupPage /></isAnon>} />
      </Routes>
      <Footer />
      </AppProvider>
    </>
  )
}

export default App;
