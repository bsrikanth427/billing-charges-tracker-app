import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Logout = () => {
    const { logoutUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser(); // Log the user out
        navigate("/login"); // Redirect to the login page
    }, [logoutUser, navigate]);

    return null; // No UI is required
};

export default Logout;
