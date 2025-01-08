import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset any previous messages
        setMessage('');

        // Input validation
        if (!username.trim()) {
            setMessage('Username cannot be empty.');
            return;
        }

        if (!password.trim()) {
            setMessage('Password cannot be empty.');
            return;
        }

        const loginUser = { username, password };
        setIsSubmitting(true);

        try {
            const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginUser),
            });

            const result = await response.json();

            if (response.ok) {
                // Save token or session information if needed
                console.log('Login successful:', result.data);

                // Navigate based on user role (assumed from API response)
                if (result.data.role === 'Admin') {
                    navigate('/admin', { state: { user: result.data } });
                } else if (result.data.role === 'User') {
                    navigate('/admin', { state: { user: result.data } });
                } else {
                    setMessage('Unknown role. Please contact support.');
                }
            } else {
                setMessage(result.message || 'Invalid username or password.');
            }
        } catch (error) {
            setMessage('An error occurred while processing your request.');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>
                {message && (
                    <div className={`alert ${isSubmitting ? 'alert-info' : 'alert-danger'} mb-3`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;