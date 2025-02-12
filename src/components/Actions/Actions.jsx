import React from "react";
import "./Actions.css";
import homeIcon from "../../assets/home.svg";
import gasIcon from "../../assets/car.svg";
import otherIcon from "../../assets/money.svg";
import videoIcon from "../../assets/video.svg";
import gamesIcon from "../../assets/game.svg";
import Food from "../../assets/food.svg";
import shopsIcon from "../../assets/shop.svg";
import travelIcon from "../../assets/travel.svg";
import educationIcon from "../../assets/education.svg";

export const actions = [
    { icon: homeIcon, label: "Home", color: "#FF5A5F" },
    { icon: gasIcon, label: "Gas", color: "#b27dec" },
    { icon: otherIcon, label: "Other", color: "#FEC601" },
    { icon: videoIcon, label: "Videos", color: "#00BFFF" },
    { icon: gamesIcon, label: "Games", color: "#ffac00" },
    { icon: Food, label: "Food", color: "#00A86B" },
    { icon: shopsIcon, label: "Shops", color: "#FF69B4" },
    { icon: travelIcon, label: "Travel", color: "#8A2BE2" },
    { icon: educationIcon, label: "Education", color: "#32CD32" },
];

const Actions = () => {
    return (
        <div className="actions">
            <h2>Actions</h2>
            <div className="action-grid">
                {actions.map((action, index) => (
                    <div key={index} className="action-item">
                        <div
                            className="action-icon"
                            style={{ backgroundColor: action.color }}
                        >
                            <img src={action.icon} alt={action.label} />
                        </div>
                        <p>{action.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Actions;
