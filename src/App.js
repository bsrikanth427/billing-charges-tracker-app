import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddExpenses from "./components/AddExpenses";
import AddCorpusFund from "./components/AddCorpusFund";
import AddOwner from "./components/AddOwner";
import ViewOwners from "./components/ViewOwners";
import EditExpenses from "./components/EditExpenses";
import ViewAllExpenses from "./components/ViewAllExpenses";
import ViewExpenses from "./components/ViewExpenses";
import ViewFunds from "./components/ViewFunds";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importing Bootstrap JavaScript
import "./App.css";

function App() {
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
    <Router>
      <div>
        {/* Navigation Bar */}
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
                <li className="nav-item">
                  <Link to="/addExpenses" className="nav-link" onClick={closeNavbar}>
                    Add Expenses
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addCorpusFund" className="nav-link" onClick={closeNavbar}>
                    Add Corpus Fund
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addOwner" className="nav-link" onClick={closeNavbar}>
                    Add Owner
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/viewOwners" className="nav-link" onClick={closeNavbar}>
                    View Owners
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/editExpenses" className="nav-link" onClick={closeNavbar}>
                    Edit Expenses
                  </Link>
                </li>
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
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-4">
          <Routes>
            <Route path="/addExpenses" element={<AddExpenses addOrEdit="add" />} />
            <Route path="/addCorpusFund" element={<AddCorpusFund />} />
            <Route path="/addOwner" element={<AddOwner />} />
            <Route path="/viewOwners" element={<ViewOwners />} />
            <Route path="/editExpenses" element={<AddExpenses addOrEdit="edit" />} />
            <Route path="/viewExpenses" element={<ViewExpenses />} />
            <Route path="/viewAllExpenses" element={<ViewAllExpenses />} />
            <Route path="/viewfunds" element={<ViewFunds />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
