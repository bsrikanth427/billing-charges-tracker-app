// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddExpenses from "./components/AddExpenses";
import AddCorpusFund from "./components/AddCorpusFund";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddOwner from "./components/AddOwner";
import ViewOwners from "./components/ViewOwners";
import ViewExpenses from "./components/ViewExpenses";
import ViewAllExpenses from "./components/ViewAllExpenses";


function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Elite Towers</h1>
        <nav>
          <Link to="/addExpenses" className="btn btn-primary m-2">Add Expenses</Link>
          <Link to="/addCorpusFund" className="btn btn-primary m-2">Add CorpusFund</Link>
          <Link to="/addOwner" className="btn btn-primary m-2">Add Owner</Link>
          <Link to="/viewOwners" className="btn btn-primary m-2">View Owners</Link>
          <Link to="/viewExpenses" className="btn btn-primary m-2">View Expenses</Link>
          <Link to="/viewAllExpenses" className="btn btn-primary m-2">View All Expenses</Link>
        </nav>
        <Routes>
          <Route path="/addExpenses" element={<AddExpenses />} />
          <Route path="/addCorpusFund" element={<AddCorpusFund />} />
          <Route path="/addOwner" element={<AddOwner />} />
          <Route path="/viewOwners" element={<ViewOwners />} />
          <Route path="/viewExpenses" element={<ViewExpenses />} />
          <Route path="/viewAllExpenses" element={<ViewAllExpenses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
