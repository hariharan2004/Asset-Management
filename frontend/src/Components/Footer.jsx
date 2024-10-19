import React from "react";
import "../Styles/Footer.css"; // Make sure to create this CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© Lazarus Finance 2024. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="https://x.com/lazarusfinance" target="_blank" rel="noopener noreferrer">Twitter</a>
          <span> · </span>
          <a href="https://discord.gg/W5AAG9GM" target="_blank" rel="noopener noreferrer">Discord</a>
          <span> · </span>
          <a href="https://telegram.org/lazarus_finance" target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
