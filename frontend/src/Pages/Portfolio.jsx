import React from 'react';
import '../Styles/Portfolio.css'; // Ensure to create a corresponding CSS file
import bitcoinLogo from '../Icons/bitcoin.png';
import ethereumLogo from '../Icons/etherum.png';
import injectiveLogo from '../Icons/injective.svg';

const portfolioData = {
  asset: "$100",
  profit: "$50",
  roi: "50%",
  address: "injafb454jrb4bn4b5n4b45n4b5n4b5n4"
};

const assetData = [
  {
    token: 'BTC',
    invested: "$100",
    current: "$150",
    profit: "$50",
    roi: "50%",
    entryPrice: "$62,560",
    logo: bitcoinLogo
  },
  {
    token: 'ETH',
    invested: "$100",
    current: "$150",
    profit: "$50",
    roi: "50%",
    entryPrice: "$2,200",
    logo: ethereumLogo
  },
  {
    token: 'INJ',
    invested: "$100",
    current: "$150",
    profit: "$50",
    roi: "50%",
    entryPrice: "$13",
    logo: injectiveLogo
  }
  // Add more assets as needed
];

const Portfolio = () => {
  return (
    <>
      <div className="portfolio-detail-container">
        {/* Left Box for Vault Performance */}
        <div className="portfolio-left-empty-box">
          <div className="portfolio-left-box-content">
            <div className="portfolio-title">
              <h2>Portfolio Performance</h2>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="portfolio-content">
          <div className="portfolio-perf-container">
            <div className="portfolio-info-actions-row">
              {/* Vault Info */}
              <div className="portfolio-info">
                <p className="portfolio-info-heading" style={{color:'#FF6F00'}}>PORT INFO</p>
                <div className="portfolio-address">{portfolioData.address}</div>
                <div className="portfolio-stats">
                  <div className="portfolio-stat">
                    <span style={{color:'#AF27DD'}}>Asset</span>
                    <p>{portfolioData.asset}</p>
                  </div>
                  <div className="portfolio-stat">
                    <span style={{color:'#AF27DD'}}>Profit</span>
                    <p>{portfolioData.profit}</p>
                  </div>
                  <div className="portfolio-stat">
                    <span style={{color:'#AF27DD'}}>ROI</span>
                    <p>{portfolioData.roi}</p>
                  </div>
                </div>
              </div>

              {/* Deposit/Withdraw */}
              <div className="portfolio-actions">
                <div className="portfolio-deposit-withdraw-header">
                  <h4 style={{color:'#FF6F00'}}>DEPOSIT</h4>
                  <h4 style={{color:'#FF6F00'}}>WITHDRAW</h4>
                </div>
                <div className="portfolio-deposit-input">
                  <input type="number" placeholder="0" className="portfolio-amount-input" />
                  <span className="portfolio-currency-label">USDT</span>
                </div>
                <div className="portfolio-balance-container">
                  <span style={{color:'#AF27DD'}}>BALANCE: $100</span>
                  <button className="portfolio-max-button" style={{color:'#AF27DD'}}>MAX</button>
                </div>
                <button className="portfolio-deposit-button" style={{color:'#FF6F00'}}>DEPOSIT</button>
              </div> 
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className='portfolio-main-second'>
        <div className="portfolio-transaction-details">
          <p className='portfolio-assetinfo-heading' style={{color:'#FF6F00'}}>ASSET INFORMATION</p>
          <div className="portfolio-transaction-info">
            <div className="portfolio-transaction-header">
              <span style={{color:'#FF6F00'}}>Token</span>
              <span style={{color:'#FF6F00'}}>Invested</span>
              <span style={{color:'#FF6F00'}}>Current</span>
              <span style={{color:'#FF6F00'}}>Profit</span>
              <span style={{color:'#FF6F00'}}>ROI</span>
              <span style={{color:'#FF6F00'}}>Entry Price</span>
            </div>

            {/* Loop through assetData */}
            {assetData.map((asset, index) => (
              <div className="portfolio-transaction-row" key={index}>
                <span>{asset.token}</span>
                <span>{asset.invested}</span>
                <span>{asset.current}</span>
                <span>{asset.profit}</span>
                <span>{asset.roi}</span>
                <span>{asset.entryPrice}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
