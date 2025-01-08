import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";

function ViewUser() {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editUser, setEditUser] = useState(null); // State to track user being edited
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const apiUrl = `${process.env.REACT_APP_API_URL}` + "/users";
            const response = await axios.get(apiUrl);
            setUsers(response.data.data);
        } catch (err) {
            setError("Failed to fetch users data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (inputUser) => {
        if (user && user.role === "User") {
            alert("Admin can only edit user");
            return;
        }
        setEditUser(inputUser); // Set the user to be edited
        setShowModal(true); // Show the modal
    };

    const handleDelete = async (username) => {
        try {
            if (user && user.role === "User") {
                alert("Admin can only delete user");
                return;
            }
            const apiUrl = `${process.env.REACT_APP_API_URL}` + `/users/${username}`;
            await axios.delete(apiUrl);
            setUsers(users.filter((user) => user.username !== username)); // Remove the user from state
            setMessage("User deleted successfully.");
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    const handleUpdateUser = async () => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}` + `/users/${editUser.username}`;
            const response = await axios.put(apiUrl, editUser);
            setUsers(users.map((user) => (user._id === editUser._id ? response.data.data : user))); // Update the user in state
            setMessage("User updated successfully.");
        } catch (err) {
            setError("Failed to update user.");
        } finally {
            setShowModal(false);
            setEditUser(null);
        }
    };

    return (
        <div>
            <div>
                <h1>Users</h1>
            </div>
            <div>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(user.username)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Editing User */}
            {showModal && (
                <div className="modal show d-block" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={editUser.username}
                                            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={editUser.email}
                                            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="role" className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            id="role"
                                            value={editUser.role}
                                            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                        >
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phoneNumber"
                                            value={editUser.phoneNumber}
                                            onChange={(e) => setEditUser({ ...editUser, phoneNumber: e.target.value })}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleUpdateUser}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewUser;
