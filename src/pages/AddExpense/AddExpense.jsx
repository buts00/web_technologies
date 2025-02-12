import React, { useState } from "react";
import "./AddExpense.css";
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../../api/ExpensesApi';
import { actions } from '../../components/Actions/Actions';

const AddExpense = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        category: "",
        date: "",
        amount: "",
        name: ""
    });

    const [errors, setErrors] = useState({
        category: "",
        date: "",
        amount: "",
        name: ""
    });

    // Отримуємо категорії з labels `actions`
    const categories = actions.map(action => action.label);

    const validationRules = {
        category: (value) => {
            if (!value) return "Please select a category.";
            return "";
        },
        date: (value) => {
            if (!value) return "Please select a date.";
            return "";
        },
        amount: (value) => {
            if (!value) return "Please enter an amount.";
            if (isNaN(value) || parseFloat(value) <= 0) return "Amount must be a positive number.";
            return "";
        },
        name: (value) => {
            if (!value) return "Please enter a name.";
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
            category: validationRules.category(formData.category),
            date: validationRules.date(formData.date),
            amount: validationRules.amount(formData.amount),
            name: validationRules.name(formData.name)
        };

        setErrors(newErrors);

        if (!newErrors.category && !newErrors.date && !newErrors.amount && !newErrors.name) {
            const expenseData = {
                category: formData.category,
                amount: parseFloat(formData.amount),
                name: formData.name,
                transaction: true
            };

            try {
                const response = await addExpense(expenseData);
                console.log("Expense added successfully:", response);
                setFormData({ category: "", date: "", amount: "", name: "" });
                navigate("/");
            } catch (error) {
                console.error("Error adding expense:", error);
            }
        }
    };

    return (
        <div className="add-expense">
            <div className="container">
                <h1 className="add-expense-text">Add Expense</h1>
                <form className="add-expense-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        {errors.category && <span className="error">{errors.category}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.date && <span className="error">{errors.date}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="input-group">
                        <input
                            name="amount"
                            type="number"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="input"
                        />
                        {errors.amount && <span className="error">{errors.amount}</span>}
                    </div>
                    <button className="add-expense-button" type="submit">Add Expense</button>
                </form>
            </div>
        </div>
    );
};

export default AddExpense;
