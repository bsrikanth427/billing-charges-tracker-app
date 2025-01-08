import React, { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
    // Fetch saved user data from localStorage or set to null if not found
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        console.log("savedUser from UserContextProvider: ", JSON.parse(savedUser));
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const loginUser = (user) => {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('user');
        console.log("User logged out");
    }

    return (
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
