import React from 'react';
import '../Styles/DashboardVault.css'; // Ensure the CSS file is linked properly

const DashboardVault = () => {
  // Example data for vaults
  const vaultData = [
    {
      name: 'BTC/USDT',
      invested: '$100',
      current: '$200',
      profit: '$100',
      roi: '100%',
    },
    {
      name: 'ETH/USDT',
      invested: '$150',
      current: '$250',
      profit: '$100',
      roi: '67%',
    },
  ];

  return (
    <div className="dashboard-vault-container">
      {/* Left Box - Invested Vaults */}
      <div className="invested-vaults-container">
        <h2 className="section-heading" style={{color:'#FF6F00'}}>INVESTED VAULTS</h2>
        
        <div className="vaults-table">
          <div className="vaults-header">
            <span style={{color:'#FF6F00'}}>VAULTS</span>
            <span style={{color:'#FF6F00'}}>INVESTED</span>
            <span style={{color:'#FF6F00'}}>CURRENT</span>
            <span style={{color:'#FF6F00'}}>PROFIT</span>
            <span style={{color:'#FF6F00'}}>ROI</span>
          </div>

          {/* Map through vault data and display */}
          {vaultData.map((vault, index) => (
            <div className="vaults-row" key={index}>
              <span>{vault.name}</span>
              <span>{vault.invested}</span>
              <span style={{color:'#00FF44'}}>{vault.current}</span>
              <span style={{color:'#00FF44'}}>{vault.profit}</span>
              <span style={{color:'#00FF44'}}>{vault.roi}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Content with 2 Boxes and ROI Graph */}
      <div className="dashboard-right-content">
        {/* First Row with 2 boxes */}
        <div className="vault-roi-boxes">
          {/* Vault Value Box */}
          <div className="vault-value-box">
            <h5 style={{color:'#FF6F00'}}>Vault Value</h5>
            <p>Invested: $100</p>
            <p>Current: $200</p>
          </div>
          
          {/* ROI Box */}
          <div className="roi-box">
            <h5 style={{color:'#FF6F00'}}>ROI</h5>
            <p>ROI: +$100</p>
            <p>ROI(%): +100%</p>
          </div>
        </div>

        {/* Full Width Box for ROI Graph */}
        <div className="roi-graph-box">
          <h5 className='roi-graph-box-heading' style={{color:'#FF6F00'}}>ROI GRAPH</h5>
          {/* You can integrate a chart here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardVault;
