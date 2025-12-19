import React from 'react';
import './DepositFAQ.css';

const DepositFAQ = () => {
  return (
    <div className="info-block">
            <div className="tips-section">
              <h3>Tips</h3>
              <ul>
                <li>This address only supports deposit of USDT assets. Do not deposit other assets to this address as the asset will not be credited or recoverable.</li>
                <li>Please note: if the single deposit amount is less than the minimum deposit amount, it will credited. The platform will not be liable for any loss of assets resulting from this. Thank you for your understanding and support!</li>
              </ul>
            </div>
            <div className="faq-section">
              <h3>Deposit FAQ</h3>
              <ul>
                <li><a href="#">How to Deposit on Zynk?</a></li>
                <li><a href="#">Have an uncredited deposit? Apply for return</a></li>
                <li><a href="#">View all deposit & withdrawal status</a></li>
              </ul>
            </div>
            <div className="buy-crypto-section">
              <h3>Buy Crypto</h3>
              <p>Supports buying crypto with Visa, Mastercard, PayPal, and bank transfer</p>
            </div>
    </div>
  );
};

export default DepositFAQ;