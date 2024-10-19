import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/vaults.css'; // Ensure you have the CSS file updated
import bitcoinLogo from '../Icons/bitcoin.png';
import ethereumLogo from '../Icons/etherum.png'; 
import injectiveLogo from '../Icons/injective.svg';

const vaultData = [
  {
    name: 'BTC/USDT',
    tvl: '$1000',
    profit: '$1000',
    apy: '200%',
    valueCurr: '$2000',
    profit7Days: '$10000',
    roi: '500%',
    logo: bitcoinLogo,
  },
  {
    name: 'ETH/USDT',
    tvl: '$1000',
    profit: '$1000',
    apy: '200%',
    valueCurr: '$2000',
    profit7Days: '$10000',
    roi: '500%',
    logo: ethereumLogo,
  },
  {
    name: 'INJ/USDT',
    tvl: '$1000',
    profit: '$1000',
    apy: '200%',
    valueCurr: '$2000',
    profit7Days: '$10000',
    roi: '500%',
    logo: injectiveLogo,
  },
  {
    name: 'BTC/USDT',
    tvl: '$1000',
    profit: '$1000',
    apy: '200%',
    valueCurr: '$2000',
    profit7Days: '$10000',
    roi: '500%',
    logo: bitcoinLogo,
  },
  {
    name: 'ETH/USDT',
    tvl: '$1000',
    profit: '$1000',
    apy: '200%',
    valueCurr: '$2000',
    profit7Days: '$10000',
    roi: '500%',
    logo: ethereumLogo,
  },
  {
    name: 'INJ/USDT',
    tvl: '$1000',
    profit: '$1000',
    apy: '200%',
    valueCurr: '$2000',
    profit7Days: '$10000',
    roi: '500%',
    logo: injectiveLogo,
  },
  // Add more vaults as needed
];

const Vaults = ({ count = 6 }) => { // Default to 6 if no count is provided
  return (
    <div className="vaults-container">
      {vaultData.slice(0, count).map((vault, index) => (
        <Link 
          to={`/vault/${vault.name.replace('/', '').toLowerCase()}`} 
          key={index} 
          className="vault-card" 
          aria-label={`View details for ${vault.name}`} // Accessibility improvement
        >
          <div className="vault-header">
            <img src={vault.logo} alt={`${vault.name} logo`} className="vault-logo" />
            <h3 className="vault-name">{vault.name}</h3>
          </div>
          <div className="vault-details">
            <div className="vault-stats">
              <p>TVL</p>
              <p>Profit</p>
              <p>APY</p>
            </div>
            <div className="vault-values">
              <p>{vault.tvl}</p>
              <p style={{ color: '#00FF44' }}>{vault.profit}</p>
              <p style={{ color: '#00FF44' }}>{vault.apy}</p>
            </div>
          </div>
          <div className="vault-details">
            <div className="vault-stats">
              <p>Value</p>
              <p>Profit(7D)</p>
              <p>ROI</p>
            </div>
            <div className="vault-values">
              <p>{vault.valueCurr}</p>
              <p style={{ color: '#00FF44' }}>{vault.profit7Days}</p>
              <p style={{ color: '#00FF44' }}>{vault.roi}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Vaults;
