import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importing Bootstrap JavaScript


function Navbar() {

    const { user, setUser } = useContext(UserContext);
    console.log("user in navbar from userContext :", user);

    // State to manage navbar collapse
    const [isNavbarCollapsed, setNavbarCollapsed] = useState(true);

    // Toggle the navbar state
    const handleNavbarToggle = () => {
        setNavbarCollapsed(!isNavbarCollapsed);
    };

    // Close navbar when a nav item is clicked
    const closeNavbar = () => {
        setNavbarCollapsed(true);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        Elite Towers
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded={!isNavbarCollapsed ? "true" : "false"}
                        aria-label="Toggle navigation"
                        onClick={handleNavbarToggle}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`collapse navbar-collapse ${!isNavbarCollapsed ? "show" : ""}`}
                        id="navbarNav"
                    >
                        <ul className="navbar-nav ms-auto">
                            {user && user.role === "Admin" && (
                                <>

                                    <li className="nav-item">
                                        <Link to="/addExpenses" className="nav-link" onClick={closeNavbar}>
                                            Add Expenses
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/editExpenses" className="nav-link" onClick={closeNavbar}>
                                            Edit Expenses
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/addOwner" className="nav-link" onClick={closeNavbar}>
                                            Add Owner
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/addUser" className="nav-link" onClick={closeNavbar}>
                                            Add User
                                        </Link>
                                    </li>
                                </>
                            )}

                            <li className="nav-item">
                                <Link to="/viewAllExpenses" className="nav-link" onClick={closeNavbar}>
                                    View All Expenses
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/viewfunds" className="nav-link" onClick={closeNavbar}>
                                    View Corpus Funds
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/viewOwners" className="nav-link" onClick={closeNavbar}>
                                    View Owners
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/viewUser" className="nav-link" onClick={closeNavbar}>
                                    View Users
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link" onClick={closeNavbar}>
                                    Logout
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;