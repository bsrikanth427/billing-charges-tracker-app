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
import AddUser from "./components/AddUser";
import ViewUser from "./components/ViewUser";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Importing Bootstrap JavaScript
import "./App.css";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import UserContext from "./context/UserContext";

function App() {

  const { user, setUser } = useContext(UserContext);
  console.log("user in App component from userContext :", user);
  return (
    <div>
      {user && (
        <Navbar></Navbar>
      )}

      <Routes>
        <Route path="/addExpenses" element={<AddExpenses addOrEdit="add" />} />
        <Route path="/addCorpusFund" element={<AddCorpusFund />} />
        <Route path="/addOwner" element={<AddOwner />} />
        <Route path="/viewOwners" element={<ViewOwners />} />
        <Route path="/editExpenses" element={<AddExpenses addOrEdit="edit" />} />
        <Route path="/viewExpenses" element={<ViewExpenses />} />
        <Route path="/viewAllExpenses" element={<ViewAllExpenses />} />
        <Route path="/viewfunds" element={<ViewFunds />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/viewUser" element={<ViewUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
