// External Libraries 
import { React, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';                
import { AuthContext } from "../context/auth.context"


// Internal Libraries / Component

// Styles / Assets
import './Navbar.css'



function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 

  return (
    <>
    {isLoggedIn && (
      <nav className="side-navbar">
        <div className="side-navbar-container">
          <ul className="side-navbar-links">
            <li>
              <NavLink to="/dashboard" className="side-navbar-link" >Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/projects" className="side-navbar-link">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/clients" className="side-navbar-link">Clients</NavLink>
            </li>
          </ul>
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </div>
      </nav>
    )}
    {!isLoggedIn && (
      <nav className="top-navbar">
        <div className="top-navbar-container">
          <ul className="top-navbar-links">
            <li>
              <NavLink to="/" className="top-navbar-link" >Home</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="top-navbar-link">Signup</NavLink>
            </li>
            <li>
              <NavLink to="/login" className="top-navbar-link">Login</NavLink>
            </li>
          </ul>   
          </div>
      </nav>
    )}
    </>
  )
}

export default Navbar 