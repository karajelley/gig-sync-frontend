// External Libraries 

// Internal Libraries / Components

// Styles / Assets

function ClientsPage() {

  const storedToken = localStorage.getItem("authToken");

  axios
  .get(
    `${API_URL}/api/clients`,
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => setProjects(response.data))
    .catch((error) => console.log(error));
};
  )
  return (
    <>

    </>
  )
}

export default ClientsPage;