import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { AppProvider } from "../context/AppContext";
import ClientCard from "../components/mui/ClientCard";


function ClientsPage() {
  // Hardcoded client data for preview
  const sampleClient = {
    _id: "1", // Typically the MongoDB ObjectId
    name: "Diego",
    email: "diego@example.com",
    phone: "123-456-7890",
    company: "Tech Solutions",
    user: "605072c4922a235d1d7c9afe"
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Clients List (Preview)</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {/* Rendering one hardcoded client card to see the design */}
        <ClientCard client={sampleClient} />
      </div>
    </div>
  );
};

export default ClientsPage;
