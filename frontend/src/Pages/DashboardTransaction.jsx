import React, { useState, useEffect } from 'react';
import '../Styles/DashboardTransaction.css'; // Ensure the CSS file is linked properly

const DashboardTransaction = ({ walletAddress }) => {
  const walletTransaction = [
    {
      name: 'BTC',
      type: 'BUY',
      entry: '$64200',
    },
    {
      name: 'ETH',
      type: 'BUY',
      entry: '$4200',
    },
  ];

  const [userTransaction, setUserTransaction] = useState([]);

  useEffect(() => {
    if (!walletAddress) {
      console.log*("Wallet address",walletAddress);
      console.error('No wallet address provided.');
      return;
    }

    // Fetch transaction data from the backend
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/transactions/${walletAddress}`
        ); // Replace with your API URL
        const data = await response.json();
        setUserTransaction(data.transactions || []); // Ensure an empty array if no transactions
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [walletAddress]);

  return (
    <div className="transaction-container">
      <div className="your-transaction">
        <h2 className="your-transaction-heading" style={{ color: '#FF6F00' }}>
          YOUR TRANSACTION
        </h2>
        <div className="your-transaction-table">
          {userTransaction && userTransaction.length > 0 ? (
            userTransaction.map((transaction, index) => (
              <div className="your-transaction-row" key={index}>
                <span>{transaction.vaultName}</span> {/* Display vault name */}
                <span>{transaction.type.toUpperCase()}</span>{' '}
                {/* Display transaction type */}
                <span>${transaction.amount}</span>{' '}
                {/* Display transaction amount */}
              </div>
            ))
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      </div>
      <div className="wallet-transaction">
        <p style={{ color: '#FF6F00' }}>WALLET TRANSACTION</p>
        <div className="wallet-transaction-table">
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
