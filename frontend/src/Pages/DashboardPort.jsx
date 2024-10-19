import React from 'react';
import '../Styles/DashboardPort.css'; // Ensure the CSS file is linked properly

const DashboardPort = () => {
  // Example data for port
  const vaultData = [
    {
      name: 'BTC',
      invested: '$100',
      current: '$200',
      profit: '$100',
      roi: '100%',
    },
    {
      name: 'ETH',
      invested: '$150',
      current: '$250',
      profit: '$100',
      roi: '67%',
    },
  ];

  return (
    <div className="dashboard-port-container">
      {/* Left Box - Invested port */}
      <div className="invested-port-container">
        <h2 className="port-section-heading" style={{color:'#FF6F00'}}>INVESTED PORTS</h2>
        
        <div className="port-table">
          <div className="port-header">
            <span style={{color:'#FF6F00'}}>PORT</span>
            <span style={{color:'#FF6F00'}}>INVESTED</span>
            <span style={{color:'#FF6F00'}}>CURRENT</span>
            <span style={{color:'#FF6F00'}}>PROFIT</span>
            <span style={{color:'#FF6F00'}}>ROI</span>
          </div>

          {/* Map through vault data and display */}
          {vaultData.map((vault, index) => (
            <div className="port-row" key={index}>
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
      <div className="dashboard-port-right-content">
        {/* First Row with 2 boxes */}
        <div className="port-roi-boxes">
          {/* Vault Value Box */}
          <div className="port-value-box">
            <h5 style={{color:'#FF6F00'}}>Vault Value</h5>
            <p>Invested: $100</p>
            <p>Current: $200</p>
          </div>
          
          {/* ROI Box */}
          <div className="port-roi-box">
            <h5 style={{color:'#FF6F00'}}>ROI</h5>
            <p>ROI: +$100</p>
            <p>ROI(%): +100%</p>
          </div>
        </div>

        {/* Full Width Box for ROI Graph */}
        <div className="port-roi-graph-box">
          <h5 className='roi-graph-box-heading' style={{color:'#FF6F00'}}>ROI GRAPH</h5>
          {/* You can integrate a chart here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPort;
