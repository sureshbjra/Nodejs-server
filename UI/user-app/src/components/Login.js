import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const validate = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 2) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('http://localhost:3010/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                if (!response.ok) {
                    throw new Error('Login failed');
                }
                const data = await response.json();
                console.log('Login successful:', data);
                if (data?.message == 'Login successful') {
                    navigate('/dashboard');
                }
            } catch (error) {
                console.error('Error logging in:', error);
                setErrors({ general: 'Login failed. Please try again.' });
            }
        }
    };

    return (<div class="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autocomplete="new-password" />
                {errors.password && <span style={{ color: 'red' }}>
                    {errors.password}</span>}
            </div>
            <button type="submit">Login</button>
            <p>Don't have an account?
                <Link to={`/register`}>Register here</Link>
            </p>
        </form>
    </div>);
};

export default Login;