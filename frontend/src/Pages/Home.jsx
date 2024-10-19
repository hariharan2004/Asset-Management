import React from "react";
import "../Styles/Home.css"; // Assuming the CSS file will be stored here
import asset from '../Images/asset-logo.png';
import { Link } from "react-router-dom";
import Vaults from "./Vaults"; // Import the Vaults component
import ailogo from '../Icons/artificial-intelligence.png';
import portlogo from '../Icons/portfolio-management.png';
import analyticslogo from '../Icons/analytics.png';
import auditlogo from '../Icons/security-aduit.png';
const Home = () => {
  return (
    <main className="home-section">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Algorithmic Trading For Everyone</h1>
            <p>
              Empowering retail investors to navigate crypto markets confidently, reducing risks and enhancing profitability, regardless of market conditions. Paving the way for a secure and profitable crypto future.
            </p>
            <div className="buttons">
              <Link to="/retailers/vaults" className="trade-now">TRADE NOW!</Link>
              <a className="whitepaper" href="https://lazarus-finance.gitbook.io/lazarusfinance" target="_blank" rel="noreferrer">DOCUMENTATION</a>
            </div>
          </div>
          <div className="hero-image">
            <img src={asset} alt="Trading graph" />
          </div>
        </div>
      </div>
      
      {/* Key Features Section */}
      <section className="home-key-features">
        <h2 className="home-keyfeatures-heading">Key Features</h2>
        <div className="home-key-features-container">
          <div className="key-feature-item">
            <img src={ailogo} alt="Algorithmic Intelligence" className="feature-image" />
            <h3>Algorithmic Intelligence</h3>
            <p>Automated algorithms analyze, execute, and learn from historical behavior.</p>
          </div>
          <div className="key-feature-item">
            <img src={portlogo} alt="Portfolio Management" className="feature-image" />
            <h3>Portfolio Management</h3>
            <p>Algorithm-driven selection or user customization of any asset.</p>
          </div>
          <div className="key-feature-item">
            <img src={analyticslogo} alt="Advanced Analytics" className="feature-image" />
            <h3>Advanced Analytics</h3>
            <p>Stay updated on news and market events to make informed, timely trading decisions.</p>
          </div>
          <div className="key-feature-item">
            <img src={auditlogo} alt="Audited Contracts" className="feature-image" />
            <h3>Audited Contracts</h3>
            <p>Our smart contracts undergo rigorous audits to guarantee the highest level of security and integrity.</p>
          </div>
        </div>
      </section>
      {/* Top 3 Vaults Section */}
      <section className="home-top-vaults">
        <h2 className="home-featuredvaults-heading">Featured Vaults</h2>
        <Vaults count={3} /> {/* Only display top 3 vaults */}
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          <div className="faq-item">
            <h3>What is Lazarus Finance?</h3>
            <p>
              Lazarus Finance is an AI-powered asset management platform designed to help retail investors easily trade and invest in digital assets.
            </p>
          </div>
          <div className="faq-item">
            <h3>How is Lazarus Finance different?</h3>
            <p>
              While most protocols rely on static strategies, Lazarus Finance leverages AI to provide real-time insights based on active trader behavior, allowing for dynamic and adaptive market investment strategies.
            </p>
          </div>
          <div className="faq-item">
            <h3>How does the AI algorithm work?</h3>
            <p>
              Our AI system combines multiple advanced techniques:
              <br /><strong>1. Automated Technical Indicators:</strong> We use Bollinger Bands, Moving Averages, Fibonacci levels, and support/resistance levels to analyze market trends. A decision tree or random forest model is then used to generate final trading signals.
              <br /><strong>2. Deep Learning:</strong> Real-time market insights are enhanced through deep learning models that analyze images from trusted social media sources, identifying critical support and resistance levels shared by popular traders.
              <br /><strong>3. Reinforcement Learning:</strong> Reinforcement learning is integrated to learn from past market conditions, allowing the system to improve trading decisions over time, maximizing profits and minimizing losses.
            </p>
          </div>
          <div className="faq-item">
            <h3>What are the portfolio features?</h3>
            <p>
              Lazarus Finance offers two types of portfolio management. The fully automated portfolio allows AI to select and trade assets on your behalf, optimizing performance without user intervention. Additionally, our advanced portfolio customization feature enables users to explore a diverse range of token categories, including Layer 1, Layer 2, High Cap, Metaverse, AI, and Memes. Users can choose to trade within a single category or select from multiple categories, enhancing exposure and achieving greater portfolio diversification.
            </p>
          </div>
          <div className="faq-item">
            <h3>What security measures are in place?</h3>
            <p>
              Lazarus Finance ensures robust security with encryption, two-factor authentication, and regular security audits, safeguarding your data and assets at all times.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
