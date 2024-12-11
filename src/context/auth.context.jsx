// External Libraries 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// MUI Libraries
// Internal Libraries / Components
import { API_URL } from "../api/config";



const AuthContext = React.createContext();


function AuthProviderWrapper(props) {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

    const navigate = useNavigate();


    const storeToken = (token) => {
        localStorage.setItem('authToken', token)
        setAuthToken(token);
    }


    const authenticateUser = () => {

        const storedToken = authToken || localStorage.getItem("authToken");

        if (storedToken) {
            axios
                .get(`${API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${storedToken}` },
                })
                .then((response) => {
                    const user = response.data;
                    setIsLoggedIn(true);
                    setIsLoading(false);
                    setUser(user);
                })
                .catch((error) => {
                    setIsLoggedIn(false);
                    setIsLoading(false);
                    setUser(null);
                });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    };


    const removeToken = () => {
        // Upon logout, remove the token from the localStorage
        localStorage.removeItem("authToken");
    }


    const logOutUser = () => {
        // To log out the user, remove the token
        removeToken();
        setAuthToken(null);
        authenticateUser();
        navigate('/login')

    }


    useEffect(() => {
        authenticateUser();
    }, [authToken]);


    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLoading,
                isLoggedIn,
                setAuthToken,
                storeToken,
                authenticateUser,
                logOutUser,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}; export { AuthProviderWrapper, AuthContext };