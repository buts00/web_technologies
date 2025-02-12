import React, { useEffect, useState } from "react";
import "./AllTransactions.css";
import { fetchTransactions } from "../../api/ExpensesApi";
import { actions } from '../Actions/Actions';

const AllTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions();
                if (Array.isArray(data) && Array.isArray(data[0])) {
                    setTransactions(data[0]);
                } else {
                    setError("Unexpected data format from server");
                }
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    const getIconAndColor = (category) => {
        const action = actions.find(action => action.label === category);
        const defaultAction = actions.find(action => action.label === "Other");
        return action ? { icon: action.icon, color: action.color } : { icon: defaultAction.icon, color: defaultAction.color  };
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="all-transactions">
            <h2>All Transactions</h2>
            <table>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => {
                    const { icon, color } = getIconAndColor(transaction.category);
                    return (
                        <tr key={transaction.id}>
                            <td>
                                <img src={icon} alt={transaction.category} className="icon" style={{ backgroundColor: color }} />
                                {transaction.category}
                            </td>
                            <td className="status">{transaction.transaction ? "Completed" : "Completed"}</td>
                            <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default AllTransactions;