import React, { useState } from "react";
import "../Register/Register.css";

const Settings = () => {
    const [formData, setFormData] = useState({
        nickname: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        nickname: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const validationRules = {
        nickname: (value) => {
            if (value.length < 3) return "Nickname must be at least 3 characters.";
            return "";
        },
        currentPassword: (value) => {
            if (value.length < 6) return "Current password must be at least 6 characters.";
            return "";
        },
        newPassword: (value) => {
            if (value.length < 6) return "New password must be at least 6 characters.";
            return "";
        },
        confirmPassword: (value) => {
            if (value !== formData.newPassword) return "Passwords do not match.";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {
            nickname: validationRules.nickname(formData.nickname),
            currentPassword: validationRules.currentPassword(formData.currentPassword),
            newPassword: validationRules.newPassword(formData.newPassword),
            confirmPassword: validationRules.confirmPassword(formData.confirmPassword)
        };

        setErrors(newErrors);

        if (!newErrors.nickname && !newErrors.currentPassword && !newErrors.newPassword && !newErrors.confirmPassword) {
            console.log("Settings updated successfully!");
        }
    };

    return (
        <div className="register">
            <div className="container">
                <h1 className="register-text">Settings</h1>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            name="nickname"
                            placeholder="Nickname"
                            type="text"
                            value={formData.nickname}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.nickname && <span className="error">{errors.nickname}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            name="currentPassword"
                            placeholder="Current Password"
                            type="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.currentPassword && <span className="error">{errors.currentPassword}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            name="newPassword"
                            placeholder="New Password"
                            type="password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            name="confirmPassword"
                            placeholder="Confirm New Password"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>
                    <button className="register-button" type="submit">Update Settings</button>
                </form>
            </div>
        </div>
    );
};

export default Settings;