import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import MarketTrendsTable from '../features/MarketTrendsTable';
import './DashboardPage.css';
import UserProfileSection from '../shared/UserProfileSection';

const DashboardPage = () => {
  const [walletExpanded, setWalletExpanded] = useState(false);
  const [ordersExpanded, setOrdersExpanded] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const toggleWallet = () => {
    setWalletExpanded(!walletExpanded);
  };

  const toggleOrders = () => {
    setOrdersExpanded(!ordersExpanded);
  };

  const toggleSettings = () => {
    setSettingsExpanded(!settingsExpanded);
  };

  return (
    <div className="dashboard-page">
      <Sidebar />
      <div className="dashboard-content">
        <UserProfileSection/>
        <div className="crypto-journey-section">
          <h2 className="journey-title">Start Your Crypto Journey</h2>
          <div className="journey-cards-container">
            <div className="journey-card">
              <img src="/image/dashboard/icon1.svg" alt="Identity Verification" className="card-icon" />
              <h3 className="card-title">Complete Identity Verification</h3>
              <p className="card-text">Please Complete Advanced Identity<br></br> Verification To Get Higher</p>
              <button className="card-button">Verify Now</button>
            </div>
            <div className="journey-card">
              <img src="/image/dashboard/icon2.svg" alt="2FA" className="card-icon" />
              <h3 className="card-title">2-factor Authentication (2FA)</h3>
              <p className="card-text">Please Get Verification Code From Google<br></br> Authenticator To Enable</p>
              <button className="card-button">Bid</button>
            </div>
            <div className="journey-card">
              <img src="/image/dashboard/icon3.svg" alt="Buy Crypto" className="card-icon" />
              <h3 className="card-title">Buy Crypto With One-click</h3>
              <p className="card-text">Please Get Verification Code From Google<br></br> Authenticator To Enable</p>
              <button className="card-button">Buy Crypto</button>
            </div>
          </div>
        </div>
        <div className="dashboard-photos-section">
          <div className="photos-row">
            <div>
              <img src="/image/dashboard/chart.png" alt="Chart" className="photo-item1" />
            </div>
            <div>
              <img src="/image/dashboard/news.png" alt="News" className="photo-item" />
            </div>
          </div>
          <div className="photos-column">
            <img src="/image/dashboard/minichart.png" alt="Chart" className="photo-item" />
          </div>
        </div>
        <MarketTrendsTable />
      </div>
    </div>
  );
}

export default DashboardPage;