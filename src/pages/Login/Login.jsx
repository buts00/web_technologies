import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from "../../api/authApi";
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const {isLoggedIn} = useAuth();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        general: ""
    });

    const navigate = useNavigate();

    const validationRules = {
        username: (value) => {
            if (value.length < 3) return "Username must be at least 3 characters.";
            return "";
        },
        password: (value) => {
            if (value.length < 6) return "Password must be at least 6 characters.";
            return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validationRules[name](value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            username: validationRules.username(formData.username),
            password: validationRules.password(formData.password)
        };

        setErrors(newErrors);

        if (!newErrors.username && !newErrors.password) {
            try {
                const data = await login(formData.username, formData.password);
                localStorage.setItem("token", data);
                navigate('/');
            } catch (error) {
                console.error("Login failed:", error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: error.detail || "Login failed"
                }));
            }
        }
    };

    if( isLoggedIn ) {
        return <Navigate to="/"/>;
    }

    return (
        <div className="login">
            <div className="container">
                <h1 className="login-text">Sign In</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            name="username"
                            placeholder="Username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            name="password"
                            placeholder="Password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    {errors.general && <span className="error">{errors.general}</span>}
                    <button className="login-button" type="submit">Login</button>
                    <p>
                        <Link to="/register" className="register-link">
                            Don't have an account? Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
