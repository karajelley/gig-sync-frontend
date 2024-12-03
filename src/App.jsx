// External Libraries 
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

// Internal Libraries / Components
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SignupPage from './pages/authentication/SignupPage';
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Styles / Assets
import './App.css'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<DashboardPage />} /> 
        <Route path="*" element={<NotFoundPage />} /> 
      </Routes>
      <Footer />
    </>
  )
}

export default App;
