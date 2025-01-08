import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AddUser() {

    // generate add user code here  
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate(); // React Router hook for navigation 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^\d{10}$/.test(phoneNumber)) {
            setMessage('Please enter a valid 10-digit phone number.');
            return;
        }

        if (!email.trim()) {
            setMessage('Email cannot be empty.');
            return;
        }

        if (!password.trim()) {
            setMessage('Password cannot be empty.');
            return;
        }

        const newUser = { username, email, password, role, phoneNumber };
        setIsSubmitting(true);

        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}` + "/users";
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage(result.message);
                console.log('User added:', result.data);
                setUsername('');
                setEmail('');
                setPassword('');
                setPhoneNumber('');

                // Redirect to the ViewOwners page after success
                navigate('/viewUser');

            } else {
                setMessage(result.data || 'Failed to add user.');
            }
        } catch (error) {
            setMessage('An error occurred while adding the user.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <div>
                <h1>Add User</h1>
            </div>

            <p style={{ color: 'green' }}>{message}</p>

            <div className="container">

                <form onSubmit={handleSubmit} style={{ width: '300px' }}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Add User</button>
                </form>


            </div>
        </div>

    )
}


export default AddUser;