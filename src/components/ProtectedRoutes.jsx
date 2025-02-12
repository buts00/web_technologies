import React, {useEffect} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {getCurrentUser} from "../api/authApi";
import {useAuth} from "../context/AuthContext";
import axios from 'axios';

const ProtectedRoutes = () => {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const API_URL = "http://127.0.0.1:8002";
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) return false;

            try {
                const response = await axios.get(`${API_URL}/auth/me`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setIsLoggedIn(response.status === 200);
            } catch (error) {
                console.error('An error occurred while checking authentication:', error);
                setIsLoggedIn(false)
                return false;
            }
        };
        checkAuth().then();
    }, []);

    return (
        isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
    )
};

export default ProtectedRoutes;
