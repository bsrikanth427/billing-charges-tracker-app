import React from "react";
import { Link, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AddExpenses from "./AddExpenses";
import AddCorpusFund from "./AddCorpusFund";
import AddOwner from "./AddOwner";
import ViewOwners from "./ViewOwners";
import ViewFunds from "./ViewFunds";
import ViewUser from "./ViewUser";
import AddUser from "./AddUser";
import ViewAllExpenses from "./ViewAllExpenses";
import ViewExpenses from "./ViewExpenses";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminComponent() {
    const navigate = useNavigate();

    const location = useLocation();
    const loginUser = location.state?.user;

    const [user, setUser] = React.useState(loginUser);

    console.log("user :", user);

    // Logout function
    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <span className="navbar-brand">Elite Towers</span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {/* Admin-specific navigation */}
                            {user.role === "Admin" && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/admin/addExpenses" className="nav-link">
                                            Add Expenses
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/addCorpusFund" className="nav-link">
                                            Add Corpus Fund
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/addOwner" className="nav-link">
                                            Add Owner
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/viewOwners" className="nav-link">
                                            View Owners
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/viewUser" className="nav-link">
                                            View Users
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/addUser" className="nav-link">
                                            Add User
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/* User-specific navigation */}
                            {user.role === "User" && (
                                <>
                                    <li className="nav-item">
                                        <Link to="/admin/viewExpenses" className="nav-link">
                                            View Expenses
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/admin/viewfunds" className="nav-link">
                                            View Funds
                                        </Link>
                                    </li>
                                </>
                            )}
                            {/* Common navigation */}
                            <li className="nav-item">
                                <button className="btn btn-danger ms-2" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mt-4">
                <Routes>
                    <Route path="/admin/addExpenses" element={<AddExpenses addOrEdit="add" />} />
                    <Route path="/admin/addCorpusFund" element={<AddCorpusFund />} />
                    <Route path="/admin/addOwner" element={<AddOwner />} />
                    <Route path="/admin/viewOwners" element={<ViewOwners />} />
                    <Route path="/admin/viewfunds" element={<ViewFunds />} />
                    <Route path="/admin/viewUser" element={<ViewUser />} />
                    <Route path="/admin/addUser" element={<AddUser />} />
                    <Route path="/admin/viewExpenses" element={<ViewExpenses />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminComponent;