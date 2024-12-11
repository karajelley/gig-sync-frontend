// External Libraries 
import { Navigate } from "react-router-dom";
import { useContext } from "react";
// MUI Libraries
// Internal Libraries / Components
import { AuthContext } from "../context/auth.context";



function isPrivate({ children }) {

    const { isLoggedIn, isLoading } = useContext(AuthContext);


    if (isLoading) return <p>Loading...</p>;


    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}; export default isPrivate