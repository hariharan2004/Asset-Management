import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/Vaultdetail.css'; // Ensure the CSS file is linked properly
import bitcoinLogo from '../Icons/bitcoin.png';
import ethereumLogo from '../Icons/etherum.png';
import injectiveLogo from '../Icons/injective.svg';
import { handleTxWithKeplr } from './Keplrinter';
import axios from 'axios';

const VaultDetail = ({ walletAddress }) => {
  const { vaultName } = useParams(); // Access the vault name from URL
  const [amount, setAmount] = useState(0);
  const [totalDeposited, setTotalDeposited] = useState(0); // Track the total deposited amount
  const [action, setAction] = useState('deposit'); // Track whether 'deposit' or 'withdraw' is selected
  const receiverAdd = "inj1cyz4n2pytr8l62w9pqhsn6jmc06s5hp2xsu72k";

  const depositFunds = async () => {
    const receiverAddress = receiverAdd;
    const senderAddress = walletAddress;
    const amountToTransact = (amount * Math.pow(10, 18)).toString();
    const chainId = "injective-888";
    const restEndpoint = "https://testnet.sentry.chain.grpc-web.injective.network:443";
    
    try {
      const txHash = await handleTxWithKeplr(receiverAddress, senderAddress, amountToTransact, chainId, restEndpoint);
      console.log("Transaction successful:", txHash);
  
      // Convert the input amount to number and update the total deposited amount
      const numericAmount = parseFloat(amount);
      setTotalDeposited(prevTotal => prevTotal + numericAmount);
  
      console.log("Deposit recorded:", { amount: numericAmount, walletAddress: senderAddress });
      console.log("Vault Name:",vaultName);
      // Pass the vault name when storing the transaction
      await storeTransaction(senderAddress, numericAmount, 'deposit', vaultName);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };
  
  const withdrawFunds = async () => {
    console.log("Withdrawal Initiated!");
    const senderAddress = walletAddress;
  
    try {
      const response = await axios.get(`http://localhost:5000/api/transactions/${senderAddress}`);
      const { totalAmount } = response.data;
      const Amount = parseFloat(amount);
      setTotalDeposited(totalAmount);
  
      if (amount > totalAmount) {
        console.error("Withdrawal amount exceeds total balance.");
        return;
      }
  
      console.log(`Withdrawing ${Amount} from wallet: ${senderAddress}`);
      
      console.log("Amount to withdraw:", Amount);

      console.log(`Type of withdrawal amount: ${typeof Amount}`); // Should be 'number'
      const transactionResponse = await axios.post('http://localhost:5000/api/transactions/withdraw', {
        walletAddress: senderAddress,
        amount: Amount,
        type: 'withdraw',
        vaultName: vaultName,  // Include vaultName for withdrawal
      });
  
      console.log("Transaction recorded:", transactionResponse.data);

  
      const numericAmount = parseFloat(amount);
      setTotalDeposited(prevTotal => prevTotal - numericAmount);
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
  };  

const storeTransaction = async (walletAddress, amount, type, vaultName) => {
  console.log("Sending data to backend:", { walletAddress, amount, type, vaultName });
  try {
    const response = await axios.post('http://localhost:5000/api/transactions', {
      walletAddress,
      amount,
      type,
      vaultName,  // Include the vault name
    });
    console.log('Transaction saved to the database:', response.data);
  } catch (error) {
    console.error('Error saving transaction to the database:', error);
  }
};


  const handleActionChange = (newAction) => {
    setAction(newAction);
    setAmount(''); // Reset the amount when switching actions
  };

  useEffect(() => {
    const fetchTotalDeposited = async () => {
      if (walletAddress) {
        try {
          const response = await axios.get(`http://localhost:5000/api/transactions/${walletAddress}`);
          const { totalAmount } = response.data;
          setTotalDeposited(totalAmount); // Update state with the fetched totalAmount
        } catch (error) {
          console.error('Error fetching total deposited amount:', error);
        }
      }
    };

    fetchTotalDeposited();
  }, [walletAddress]);

  const vaultData = {
    'btcusdt': {
      name: 'BTC/USDT',
      asset: '$100',
      profit: '$50',
      roi: '50%',
      address: 'inj19za42zcxjabcd8wny65t99ey2l3muh62pa6wyj',
      invested: "$100",
      current: "$150",
      entryPrice: "$62,560",
      exitPrice: "$64,020",
      logo: bitcoinLogo,
    },
    'ethusdt': {
      name: 'ETH/USDT',
      asset: '$100',
      profit: '$50',
      roi: '50%',
      address: 'inj19za42zcxjabcd8wny65t99ey2l3muh62pa6wyj',
      invested: "$100",
      current: "$150",
      entryPrice: "$2,150",
      exitPrice: "$2,670",
      logo: ethereumLogo,
    },
    'injusdt': {
      name: 'INJ/USDT',
      asset: '$100',
      profit: '$50',
      roi: '50%',
      address: 'inj19za42zcxjabcd8wny65t99ey2l3muh62pa6wyj',
      invested: "$100",
      current: "$150",
      entryPrice: "$13",
      exitPrice: "$21",
      logo: injectiveLogo,
    },
  };

  const vault = vaultData[vaultName] || { name: 'Vault not found', asset: '', profit: '', roi: '', address: '' };

  return (
    <>
      <div className="vault-detail-container">
        <div className="left-empty-box">
          <div className="left-box-content">
            <img src={vault.logo} width={50} height={50} alt={`${vault.name} logo`} />
            <div className="vault-title">
              <h2>{vault.name}</h2>
            </div>
          </div>
        </div>

        <div className="vault-content">
          <div className="vault-perf-container">
            <div className="vault-info-actions-row">
              <div className="vault-info">
                <h2 className="vault-info-heading">VAULT INFO</h2>
                <div className="vault-address">{vault.address}</div>
                <div className="vault-stats">
                  <div className="vault-stat">
                    <span style={{ color: '#AF27DD' }}>Asset</span>
                    <p>{vault.asset}</p>
                  </div>
                  <div className="vault-stat">
                    <span style={{ color: '#AF27DD' }}>Profit</span>
                    <p style={{ color: '#00FF44' }}>{vault.profit}</p>
                  </div>
                  <div className="vault-stat">
                    <span style={{ color: '#AF27DD' }}>ROI</span>
                    <p style={{ color: '#00FF44' }}>{vault.roi}</p>
                  </div>
                </div>
              </div>

              <div className="vault-actions">
                <div className="deposit-withdraw-header">
                  <h4 
                    style={{ color: action === 'deposit' ? '#FF6F00' : '#000' }} 
                    onClick={() => handleActionChange('deposit')}
                  >
                    DEPOSIT
                  </h4>
                  <h4 
                    style={{ color: action === 'withdraw' ? '#FF6F00' : '#000' }} 
                    onClick={() => handleActionChange('withdraw')}
                  >
                    WITHDRAW
                  </h4>
                </div>
                {(action === 'deposit' || action === 'withdraw') && (
                  <div className="amount-input-container">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0"
                      className="amount-input"
                    />
                    <span className="currency-label" style={{ color: '#AF27DD' }}>USDT</span>
                  </div>
                )}
                <div className="balance-container">
                  <span style={{ color: '#AF27DD' }}>BALANCE: $100</span>
                  <button className="max-button" style={{ color: '#AF27DD' }}>MAX</button>
                </div>
                <button 
                  className="deposit-button" 
                  onClick={action === 'deposit' ? depositFunds : withdrawFunds}
                >
                  {action === 'deposit' ? 'DEPOSIT' : 'WITHDRAW'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='main-second'>
        <div className="main-second-left-empty-box">
          <div className="main-second-left-box-content">
            <img src={vault.logo} width={50} height={50} alt={`${vault.name} logo`} />
            <div className="main-second-vault-title">
              <h2 style={{ color: '#FF6F00' }}>{vault.name}</h2>
              <h3 style={{ color: '#FF6F00' }}>Vault Performance</h3>
            </div>
          </div>
        </div>
        <div className="transaction-details">
          <h4 className="transaction-heading">TRANSACTION</h4>
          <div className="transaction-info">
            <div className="transaction-header">
              <span style={{ color: '#FF6F00' }}>Invested</span>
              <span style={{ color: '#FF6F00' }}>Current</span>
              <span style={{ color: '#FF6F00' }}>Profit</span>
              <span style={{ color: '#FF6F00' }}>ROI</span>
              <span style={{ color: '#FF6F00' }}>Entry</span>
              <span style={{ color: '#FF6F00' }}>Exit</span>
            </div>
            <div className="transaction-row">
              <span>{vault.invested}</span>
              <span style={{ color: '#AF27DD' }}>{vault.current}</span>
              <span style={{ color: '#AF27DD' }}>{vault.profit}</span>
              <span style={{ color: '#AF27DD' }}>{vault.roi}</span>
              <span>{vault.entryPrice}</span>
              <span>{vault.exitPrice}</span>
            </div>
          </div>
          <div className="total-deposited">
            <h4>Total Deposited: {totalDeposited} USDT</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default VaultDetail;
