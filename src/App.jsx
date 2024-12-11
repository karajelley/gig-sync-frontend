// External Libraries 
import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { AppProvider } from "./context/AppContext.jsx";
// Internal Libraries / Components
import DashboardPage from "./pages/DashboardPage.jsx";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Mui/Navbar.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import SignupPage from './pages/authentication/SignupPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ClientsPage from "./pages/ClientsPage.jsx";
import ProjectDetailsPage from "./pages/ProjectDetailsPage.jsx";
import ClientDetailsPage from "./pages/ClientDetailsPage.jsx";
import IsPrivate from "./components/IsPrivate.jsx";

// Wrapper Layout for routes with Navbar
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Routes without Navbar */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Routes with Navbar */}
      <Route
        path="/api/dashboard"
        element={
          <IsPrivate>
            <Layout>
              <DashboardPage />
            </Layout>
          </IsPrivate>
        }
      />
      <Route
        path="/api/projectspage"
        element={
          <IsPrivate>
            <Layout>
              <ProjectsPage />
            </Layout>
          </IsPrivate>
        }
      />
      <Route
        path="/api/clientspage"
        element={
          <IsPrivate>
            <Layout>
              <ClientsPage />
            </Layout>
          </IsPrivate>
        }
      />
      <Route
        path="/api/projectdetails/:id"
        element={
          <IsPrivate>
            <Layout>
              <ProjectDetailsPage />
            </Layout>
          </IsPrivate>
        }
      />
      <Route
        path="/api/clientdetails/:id"
        element={
          <IsPrivate>
            <Layout>
              <ClientDetailsPage />
            </Layout>
          </IsPrivate>
        }
      />
      <Route
        path="/api/profile"
        element={
          <IsPrivate>
            <Layout>
              <ProfilePage />
            </Layout>
          </IsPrivate>
        }
      />
    </Routes>
  );
}

export default App;
