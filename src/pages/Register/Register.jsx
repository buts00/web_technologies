import React, { useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { registerUser } from "../../api/authApi";
import "./Register.css";
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const {isLoggedIn} = useAuth();
    console.log("Register", isLoggedIn);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [serverError, setServerError] = useState("");
    const navigate = useNavigate();

    const validationRules = {
        username: (value) => {
            if (value.length < 3) return "Username must be at least 3 characters.";
            return "";
        },
        password: (value) => {
            if (value.length < 6) return "Password must be at least 6 characters.";
            return "";
        },
        confirmPassword: (value) => {
            if (value !== formData.password) return "Passwords do not match.";
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
            password: validationRules.password(formData.password),
            confirmPassword: validationRules.confirmPassword(formData.confirmPassword)
        };

        setErrors(newErrors);

        if (!newErrors.username && !newErrors.password && !newErrors.confirmPassword) {
            try {
                const data = await registerUser(formData.username, formData.password);
                localStorage.setItem("token", data);
                navigate("/");
            } catch (error) {
                setServerError(error.message || "An error occurred during registration.");
            }
        }
    };

    if( isLoggedIn ) {
        return <Navigate to="/"/>;
    }

    return (
        <div className="register">
            <div className="container">
                <h1 className="register-text">Sign Up</h1>
                {serverError && <p className="server-error">{serverError}</p>}
                <form className="register-form" onSubmit={handleSubmit}>
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
                    <div className="input-group">
                        <input
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    <button className="register-button" type="submit">Register</button>
                    <p>
                        <Link to="/login" className="login-link">
                            Already have an account? Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
