import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddOwner = () => {
    const [name, setName] = useState('');
    const [flatNo, setFlatNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = { name, flatNo, phoneNo };

        try {
            const response = await fetch('http://localhost:9090/api/owners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                const result = await response.json();
                setMessage('User added successfully!');
                console.log('User added:', result);

                // Clear input fields
                setName('');
                setFlatNo('');
                setPhoneNo('');
            } else {
                setMessage('Failed to add user.');
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            setMessage('An error occurred while adding the user.');
            console.error('Error:', error);
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
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary btn-block mt-4">
                            Add Owner
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddOwner;
