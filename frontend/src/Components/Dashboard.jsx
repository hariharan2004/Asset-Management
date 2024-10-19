// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Dashboard.css'; // Assuming CSS is stored in Dashboard.css
import maleprofilelogo from '../Icons/male-profile.png';
import phoenixlogo from '../Icons/phoenix-logo.png';
import vaultlogo from '../Icons/vault.png';
import portfoliologo from '../Icons/portfolio.png';
import historylogo from '../Icons/history.png';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <div className="logo-container">
          <Link to="/">
            <img src={phoenixlogo} alt="phoenix" className="clickable-logo" />
          </Link>
          <Link to="/retailers/dashboard/profile">
            <img src={maleprofilelogo} alt="Profile" className="clickable-logo" />
          </Link>
          <Link to="/retailers/dashboard/vault">
            <img src={vaultlogo} alt="Vault" className="clickable-logo" />
          </Link>
          <Link to="/retailers/dashboard/portfolio">
            <img src={portfoliologo} alt="Portfolio" className="clickable-logo" />
          </Link>
          <Link to="/retailers/dashboard/history">
            <img src={historylogo} alt="History" className="clickable-logo" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
