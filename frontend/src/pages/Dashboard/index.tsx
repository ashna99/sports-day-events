import React from 'react';
import Navbar from '../../components/Navbar';
import Home from '../Home';
import './Dashboard.css';

const Dashboard: React.FC = () => {

    return (
        <div className="dashboard">
            <Navbar />
            <Home />
        </div>
    );
};

export default React.memo(Dashboard);
