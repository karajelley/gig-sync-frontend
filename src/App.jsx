// External Libraries 
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppProvider } from "./AppContext.jsx";


// Internal Libraries / Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SignupPage from './pages/authentication/SignupPage';
import NotFoundPage from "./pages/NotFoundPage.jsx";
import LandingPage from "./pages/authentication/LandingPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
// Styles / Assets
import './App.css'

function App() {

  

  return (
    <>
      <AppProvider>
      <Navbar />
      <Routes>
       {/* <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="projectsspage" element={<ProjectsPage />} />
        <Route path="/signup" element={<SignupPage />} />*/}
        <Route path="/" element={<DashboardPage />} /> 
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
      <Footer />
      </AppProvider>
    </>
  )
}

export default App;
