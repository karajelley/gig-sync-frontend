import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ClientCard from "../components/mui/ClientCard";

import { API_URL } from "../api/config";

function ClientsPage() {
  const [clients, setClients] = useState ([]);
  const [errorMessage, setErrorMessage] = useState("");

    function getClients() {

      const storedToken = localStorage.getItem('authToken');

      axios 
      .get(`${API_URL}/clients`,
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        console.log(response.data)
        setClients(response.data)
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.message || "An unknown error occurred.");
        } else if (error.request) {
          setErrorMessage("No response from the server. Please try again later.");
        } else {
          setErrorMessage("An error occurred: " + error.message);
        }
      });
}

  useEffect(() => {
    getClients();
  }, []);

  return (
    <>
        <div className="clients-container">
            <h1>Clients</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <div>
                {clients.map((client) => (
                    <ClientCard key={client.id} client={client} />
                ))}
            </div>
        </div>
    </>
)

}


export default ClientsPage;
