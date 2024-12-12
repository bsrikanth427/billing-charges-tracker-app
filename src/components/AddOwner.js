import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AddOwner = () => {
    const [name, setName] = useState('');
    const [flatNo, setFlatNo] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState('Owner');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate(); // React Router hook for navigation



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(phoneNumber)) {
            setMessage('Please enter a valid 10-digit phone number.');
            return;
        }

        if (!flatNo.trim()) {
            setMessage('Flat number cannot be empty.');
            return;
        }

        const newUser = { name, flatNo, phoneNumber, role };
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:9090/api/owners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
                console.log('Owner added:', result.data);
                setName('');
                setFlatNo('');
                setPhoneNumber('');

                // Redirect to the ViewOwners page after success
                navigate('/viewOwners');

            } else {
                setMessage(result.data || 'Failed to add owner.');
            }
        } catch (error) {
            setMessage('An error occurred while adding the owner.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h3 className="text-center mb-4">Add New Owner</h3>
                    {message && <p className="alert alert-info">{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mt-4">
                            <input
                                type="text"
                                className="form-control"
                                id="flatNo"
                                placeholder="Enter flat number"
                                value={flatNo}
                                onChange={(e) => setFlatNo(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mt-4">
                            <input
                                type="tel"
                                className="form-control"
                                id="phoneNo"
                                placeholder="Enter phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                maxLength="10"
                                required
                            />
                        </div>
                        <div className="form-group mt-4">
                            <select
                                className="form-control"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            >
                                <option value="Owner">Owner</option>
                                <option value="Tenant">Tenant</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-4" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Owner'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOwner;
