import React, { useState } from 'react';
import Alert from './Alert';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 2) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirm password is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        } else setErrors({});

        try {
            const response = await fetch('http://localhost:3010/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            let type = 'info'; let message = 'Error!, Please try again.';
            if (result) {
                type = 'success';
                if (result?.message == 'User created successfully') {
                    setAlertMessage('Successfully created!');
                    setTimeout(() => {
                        navigate('/');
                    }, 100)
                } else if (result?.message == 'User already exists') {
                    type = 'error';
                    setAlertMessage('User already exists!');
                } else {
                    type = 'error';
                    setAlertMessage('Please try again!');
                }
            } else {
                setAlertMessage(message);
                type = 'error';
            }
            setAlertType(type);
            console.log(result);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    return <>
        <Link to="/" className="back-button">← Back</Link>
        <div class="card">
            <h1>Register</h1>
            {alertMessage && <Alert message={alertMessage} type={alertType} />}
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label for="username">First name:</label>
                    <input type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                    <label for="username">Last name:</label>
                    <input type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                    <label for="email">Email:</label>
                    <input type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label for="password">Password:</label>
                    <input type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label for="confirm-password">Confirm Password:</label>
                    <input type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <span
                        className="error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    </>;
}

export default Register;
