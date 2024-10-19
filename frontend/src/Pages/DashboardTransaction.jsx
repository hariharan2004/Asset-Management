import React from 'react';
import '../Styles/DashboardTransaction.css'; // Ensure the CSS file is linked properly

const DashboardTransaction = () => {
  // Example data for port
  const userTransaction= [
    {
        name: 'BTC-Vault',
        type:'DEPOSIT',
        invested: '$100'
    },
    {
        name: 'Portfolio',
        type:'DEPOSIT',
        invested: '$100'
    },
  ];
  const walletTransaction= [
    {
        name: 'BTC',
        type:'BUY',
        entry: '$64200'
    },
    {
        name: 'ETH',
        type:'BUY',
        entry: '$4200'
    },
  ];

  return (
    <div className="transaction-container">
      <div className="your-transaction">
        <h2 className="your-transaction-heading"  style={{color:'#FF6F00'}}>YOUR TRANSACTION</h2>
        <div className="your-trasacction-table">
          {userTransaction.map((vault, index) => (
            <div className="your-transaction-row" key={index}>
              <span>{vault.name}</span>
              <span>{vault.type}</span>
              <span>{vault.invested}</span>
            </div>
          ))}
        </div>
      </div>
        <div className="wallet-transaction">
            <p  style={{color:'#FF6F00'}}>WALLET TRANSACTION</p>
            <div className='wallet-transaction-table'>
                {walletTransaction.map((vault, index) => (
                <div className="wallet-transaction-row" key={index}>
                    <span>{vault.name}</span>
                    <span>{vault.type}</span>
                    <span>{vault.entry}</span>
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default DashboardTransaction;
