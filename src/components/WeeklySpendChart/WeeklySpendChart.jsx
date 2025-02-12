import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import "./WeeklySpendChart.css";
import { fetchTransactions } from "../../api/ExpensesApi";
import { actions } from '../Actions/Actions';

ChartJS.register(ArcElement, Tooltip, Legend);

const WeeklySpendChart = () => {
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

    const calculateSpendData = () => {
        const spendData = {};

        transactions.forEach(transaction => {
            const category = transaction.category;
            const amount = parseFloat(transaction.amount) || 0;

            if (!spendData[category]) {
                spendData[category] = 0;
            }
            spendData[category] += amount;
        });

        return spendData;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const spendData = calculateSpendData();
    const data = {
        labels: Object.keys(spendData),
        datasets: [
            {
                label: "Spend",
                data: Object.values(spendData),
                backgroundColor: actions.map(action => action.color),
                borderColor: "#fff",
                borderWidth: 2,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: $${value}`;
                    }
                }
            }
        }
    };

    return (
        <div className="weekly-spend-chart">
            <div className="chart-container">
                <Doughnut data={data} options={options} />
            </div>
            <div className="total-spend">
                <h3>${Object.values(spendData).reduce((acc, curr) => acc + curr, 0)}</h3>
                <p>Total Spend</p>
            </div>

        </div>
    );
};

export default WeeklySpendChart;
