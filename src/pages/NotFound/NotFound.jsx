import React from 'react';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404</h1>
            <p className="not-found-message">Page Not Found</p>
            <button className="back-home-btn">Go Back Home</button>
        </div>
    );
};

export default NotFound;
