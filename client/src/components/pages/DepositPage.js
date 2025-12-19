import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import MarketTrendsTable from '../features/MarketTrendsTable';
import DepositFAQ from '../shared/DepositFAQ';
import MainDepositSection from '../shared/MainDepositSection';
import './DepositPage.css';

const DepositPage = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');

  const popularTokens = ['USDT', 'BTC', 'ETH', 'TRX', 'SOL', 'BNB'];

  return (
    <div className="deposit-page">
      <Sidebar />
      <div className="deposit-content">
        <div className="deposit-steps">
          <div className="steps-container">
            <div className="step">
              <div className="step-circle">1</div>
              <div className="step-content">
                <h3>Select the Token and Copy the Wallet Address</h3>
              </div>
            </div>
            <div className="step">
              <div className="step-circle">2</div>
              <div className="step-content">
                <h3>Withdraw to wallet Address</h3>
              </div>
            </div>
            <div className="step">
              <div className="step-circle">3</div>
              <div className="step-content">
                <h3>Transfer Confirmation</h3>
              </div>
            </div>
            <div className="step">
              <div className="step-circle">4</div>
              <div className="step-content">
                <h3>Deposit Successful</h3>
              </div>
            </div>
          </div>
          
        </div>
        <div className="promo-banner">
            Deposit 100 USDT & Trade 100 USDT in Futures, Reward 10 USDT 
            <a href="#" className="details-link">Details</a>
        </div>
        <div className="main-deposit-section">
          <MainDepositSection />
          <DepositFAQ />
        </div>
        <MarketTrendsTable />
      </div>
    </div>
  );
};

export default DepositPage;