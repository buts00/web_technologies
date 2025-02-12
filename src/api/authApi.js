import axios from "axios";

const API_URL = "http://127.0.0.1:8002";

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/create-user`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error("Network error");
    }
};

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response;
    } catch (error) {
        console.log("Get user error:", error);
    }
};