import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const ViewOwners = () => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [currentOwner, setCurrentOwner] = useState(null); // Owner being edited
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        try {
            setLoading(true);
            const apiUrl = `${process.env.REACT_APP_API_URL}` + "/owners";
            const response = await axios.get(apiUrl);
            setOwners(response.data.data);
        } catch (err) {
            setError("Failed to fetch owners data");
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = (owner) => {
        if (user && user.role === "User") {
            alert("Admin can only edit user");
            return;
        }
        setCurrentOwner({ ...owner }); // Populate modal fields with owner data
        setShowModal(true); // Show modal
    };

    const handleModalClose = () => {
        setShowModal(false);
        setCurrentOwner(null); // Reset current owner
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentOwner((prevOwner) => ({
            ...prevOwner,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}` + "/owners/" + currentOwner.ownerId;
            const updatedResponse = await axios.put(apiUrl, currentOwner);
            setMessage(updatedResponse.data.message);
            setOwners((prevOwners) =>
                prevOwners.map((owner) =>
                    owner.ownerId === currentOwner.ownerId ? { ...owner, ...currentOwner } : owner
                )
            );
            handleModalClose();
        } catch (error) {
            setError(`Failed to update owner: ${error.message || "Unknown error"}`);
        }
    };

    const handleDelete = async (ownerId) => {
        if (user && user.role === "User") {
            alert("Admin can only delete user");
            return;
        }
        if (!window.confirm("Are you sure you want to delete this owner?")) return;

        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}` + "/owners/" + ownerId;;
            const response = await axios.delete(apiUrl);
            setOwners((prevOwners) => prevOwners.filter((owner) => owner.ownerId !== ownerId));
            setMessage(response.data.message || "Owner deleted successfully.");
        } catch (error) {
            setError(`Failed to delete owner: ${error.message || "Unknown error"}`);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Owners List</h2>
            {message && <p className="alert alert-info">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Flat Number</th>
                            <th>Role</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.map((owner) => (
                            <tr key={owner.id}>
                                <td>{owner.name}</td>
                                <td>{owner.phoneNumber}</td>
                                <td>{owner.flatNo}</td>
                                <td>{owner.role}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEditClick(owner)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(owner.ownerId)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Edit Modal */}
            {currentOwner && (
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Owner</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="ownerName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={currentOwner.name || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="ownerPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNumber"
                                    value={currentOwner.phoneNumber || ""}
                                    onChange={handleInputChange}
                                    maxLength="10"
                                />
                            </Form.Group>
                            <Form.Group controlId="ownerFlat">
                                <Form.Label>Flat Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="flatNo"
                                    value={currentOwner.flatNo || ""}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default ViewOwners;
