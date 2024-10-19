import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Header.css';
import phoneixlogo from '../Icons/phoenix-logo.png';
import keplrImage from '../Icons/Keplrlogo.png';
import leapImage from '../Icons/Leapicon.png';

const Header = ({ setWalletAddress, walletAddress }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger menu
  const [retailersDropdownVisible, setRetailersDropdownVisible] = useState(false); // For Retailers dropdown
  const location = useLocation();

  // Handle scroll for navbar
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  // Keplr wallet connection
  const connectWallet = async () => {
    try {
      await window.keplr.enable('injective-888');
      const offlineSigner = window.getOfflineSigner('injective-888');
      const accounts = await offlineSigner.getAccounts();
      setWalletAddress(accounts[0].address);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  // Leap wallet connection
  const connectLeapWallet = async () => {
    try {
      if (!window.leap) {
        alert('Leap wallet extension is not installed');
        return;
      }
      await window.leap.enable('injective-888');
      const offlineSigner = window.leap.getOfflineSigner('injective-888');
      const accounts = await offlineSigner.getAccounts();
      setWalletAddress(accounts[0].address);
      console.log('Wallet connected:', accounts[0].address);
    } catch (error) {
      console.error('Leap Wallet connection failed:', error);
    }
  };

  // Scroll handler for FAQ
  const scrollToFAQ = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Hook to manage scroll behavior
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar ${isScrolled ? 'scrolled' : 'no-border'}`}>
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={phoneixlogo} width={70} height={70} alt="lazarusfinance" />
          <h1 className="logo-title">LAZARUS<br />FINANCE</h1>
        </Link>
      </div>
      
      {/* Hamburger menu */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      
      {/* Navigation */}
      <nav className={menuOpen ? 'open' : ''}>
        <ul>
          <li className={location.pathname === '/' ? 'active' : ''}>
            <Link to="/">HOME</Link>
          </li>

          {/* Retailers with dropdown */}
          <li 
            className={location.pathname.startsWith('/retailers') ? 'active' : ''}
            onMouseEnter={() => setRetailersDropdownVisible(true)}
            onMouseLeave={() => setRetailersDropdownVisible(false)}
          >
            <Link to="#" onClick={(e) => e.preventDefault()}>
              RETAILERS
            </Link>
            {retailersDropdownVisible && (
              <ul className="dropdown-menu">
                <li><Link to="/retailers/vaults">Vaults</Link></li>
                <li><Link to="/retailers/portfolio">Portfolio</Link></li>
                {window.innerWidth >= 780 && (
                  <li><Link to="/retailers/dashboard/profile">Dashboard</Link></li>
                )}
              </ul>
            )}
          </li>

          <li className={location.pathname === '/traders' ? 'active' : ''}>
            <Link to="/traders">TRADERS</Link>
          </li>
          <li className={location.pathname === '/markets' ? 'active' : ''}>
            <Link to="/markets">MARKETS</Link>
          </li>
          <li className={location.pathname === '/institutions' ? 'active' : ''}>
            <Link to="/institutions">INSTITUTIONS</Link>
          </li>
          <li className={location.pathname === '/roadmap' ? 'active' : ''}>
            <Link to="/roadmap">ROADMAP</Link>
          </li>
          <li onClick={scrollToFAQ} style={{ cursor: 'pointer' }}>
            FAQ
          </li>
        </ul>
      </nav>

      {/* Wallet connection */}
      <div className="wallet-container" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
        {walletAddress ? (
          <span className="wallet-address">{walletAddress}</span>
        ) : (
          <>
            <button className="connect-wallet">Connect Wallet</button>
            {dropdownOpen && (
              <div className="wallet-dropdown">
                <div className="wallet-option" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={keplrImage} alt="Keplr Wallet" style={{ width: '20px', marginRight: '8px' }} />
                  <button onClick={connectWallet}>Connect Keplr</button>
                </div>
                <div className="wallet-option" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={leapImage} alt="Leap Wallet" style={{ width: '20px', marginRight: '8px' }} />
                  <button onClick={connectLeapWallet}>Connect Leap</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
