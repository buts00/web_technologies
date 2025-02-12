import React from 'react';
import './Main.css';

import WeeklySpendChart from '../../components/WeeklySpendChart/WeeklySpendChart';
import Actions from '../../components/Actions/Actions';
import AllTransactions from '../../components/AllTransactions/AllTransactions';
import Header from '../../components/Header/Header';


const Main = () => {
    return (
        <div>
            <div>
                <Header/>
            </div>

            {/* Unified Content Section */}
            <div className="dashboard-layout">
                <div className="charts-section">
                        <WeeklySpendChart />
                        <Actions />
                </div>
                <AllTransactions />
            </div>
        </div>
    );
};

export default Main;
