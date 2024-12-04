import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import "./LoginPage.css"

const API_URL = import.meta.env.VITE_API_URL;


function LoginPage(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post (`${API_URL}/api/auth/login`, requestBody)
      .then ((response) => {
        console.log(response.data);
        storeToken(response.data.authToken);

        authenticateUser();
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorDescription = error.message;
        setErrorMessage(errorDescription);
      })
  };
  
  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>

    </div>
  )
}

export default LoginPage;

