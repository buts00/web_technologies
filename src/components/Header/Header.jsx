import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Profile from '../../assets/profile.png';
import SettingIcon from '../../assets/settingIcon.png';
import ChevronDownIcon from '../../assets/chevronDownIcon.png';
import "./Header.css";
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const {setIsLoggedIn} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header className="header">


            <div className="header-actions">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>

                <Link to="/add-expense">
                    <button className="add-expense-btn">+ Add Expense</button>
                </Link>

                <div className="profile-container">
                    <img src={Profile} alt="Profile" className="profile-image" />
                    <div className="icon-container">
                        <img
                            src={ChevronDownIcon}
                            alt="option icon"
                            className="option_icon"
                        />
                        <Link to="/settings" className="link-header">
                        <div className="popup-menu">

                            Settings
                            <img src={SettingIcon} alt="Setting" className="setting-image" />

                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
