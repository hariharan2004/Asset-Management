import './App.css';
import React, { useState } from 'react';
import Header from './Components/Header.jsx';
import Home from './Pages/Home.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer.jsx';
import Vaults from './Pages/Vaults.jsx';
import Portfolio from './Pages/Portfolio.jsx';
import VaultDetails from './Pages/VaultDetails.jsx'; // Import your VaultDetails component
import Dashboard from './Components/Dashboard.jsx';
import DashboardLayout from './Components/DashboardLayout.jsx';
import DashboardLayoutPort from './Components/DashboardLayoutPort.jsx';
import DashboardLayoutTransaction from './Components/DashboardLayoutTransaction.jsx';
import DashboardLayoutProfile from './Components/DasboardLayoutProfile.jsx';
import Roadmap from './Components/Roadmap.jsx';
function App() {
  const [walletAddress, setWalletAddress] = useState(null);
  return (
    <div className="page-wrapper"> {/* Wrapper for flex layout */}
      <Router>
        <Header setWalletAddress={setWalletAddress} walletAddress={walletAddress}/> {/* Moved Header outside of Routes for consistent placement */}
        <main className="main-content"> {/* Main content wrapper */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/retailers/vaults" element={<Vaults />} />
            <Route path="/retailers/portfolio" element={<Portfolio />} />
            <Route path="/retailers/roadmap" element={<Roadmap />} />
            <Route path='/retailers/dashboard/profile' element={<DashboardLayoutProfile />} />
            <Route path='/retailers/dashboard/vault' element={<DashboardLayout />} />
            <Route path='/retailers/dashboard/portfolio' element={<DashboardLayoutPort />} />
            <Route path='/retailers/dashboard/history' element={<DashboardLayoutTransaction />} />
            <Route path='/retailers/dashboard/faq' element={<Dashboard />} />
            <Route path="/vault/:vaultName" element={<VaultDetails walletAddress={walletAddress}/>} /> {/* New route for vault details */}
          </Routes>
        </main>
        <Footer /> {/* Footer outside of Routes for consistent placement */}
      </Router>
    </div>
  );
}

export default App;
