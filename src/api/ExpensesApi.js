import axios from 'axios';

const API_URL = "http://127.0.0.1:8002/expense";

export const addExpense = async (expenseData) => {
    try {
        const response = await axios.post(API_URL, expenseData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const fetchTransactions = async () => {
    try {
        const response = await axios.get(API_URL,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response.data;
    } catch {
        throw new Error("Error fetching transactions");
    }
};
