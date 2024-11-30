// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ExpenseTable from "./components/ExpenseTable";
import SavingsTable from "./components/SavingsTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddOwner from "./components/AddOwner";
import ViewOwners from "./components/ViewOwners";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1>Expense & Savings Manager</h1>
        <nav>
          <Link to="/expenses" className="btn btn-primary m-2">Expense Table</Link>
          <Link to="/savings" className="btn btn-primary m-2">Savings Table</Link>
          <Link to="/owners" className="btn btn-primary m-2">Owners Table</Link>
          <Link to="/ownerslist" className="btn btn-primary m-2">View Owners</Link>
        </nav>
        <Routes>
          <Route path="/expenses" element={<ExpenseTable />} />
          <Route path="/savings" element={<SavingsTable />} />
          <Route path="/owners" element={<AddOwner />} />
          <Route path="/ownerslist" element={<ViewOwners />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
