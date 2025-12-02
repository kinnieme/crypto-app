import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ children }) => {
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
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/image/sidebar/home.svg" alt="Home" className="sidebar-icon" />
        <span className="sidebar-title">Dashboard</span>
      </div>
      <div className="sidebar-menu">
        <div className="sidebar-item" onClick={toggleWallet}>
          <img src="/image/sidebar/wallet.svg" alt="Wallet" className="sidebar-icon" />
          <span className="sidebar-text">Wallet</span>
          <img
            src={`/image/sidebar/${walletExpanded ? 'arrow-up' : 'arrow-down'}.svg`}
            alt="Toggle"
            className="sidebar-arrow"
          />
        </div>
        {walletExpanded && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => window.location.href = '/asset'}>Asset</div>
            <div className="submenu-item" onClick={() => window.location.href = '/deposit'}>Deposit</div>
            <div className="submenu-item" onClick={() => window.location.href = '/withdraw'}>Withdraw</div>
          </div>
        )}
        <div className="sidebar-item" onClick={toggleOrders}>
          <img src="/image/sidebar/transaction.svg" alt="Transaction" className="sidebar-icon" />
          <span className="sidebar-text">Orders</span>
          <img
            src={`/image/sidebar/${ordersExpanded ? 'arrow-up' : 'arrow-down'}.svg`}
            alt="Toggle"
            className="sidebar-arrow"
          />
        </div>
        {ordersExpanded && (
          <div className="submenu">
            <div className="submenu-item">Spot History</div>
            <div className="submenu-item">Transaction History</div>
          </div>
        )}
        <div className="sidebar-item" onClick={toggleSettings}>
          <img src="/image/sidebar/setting.svg" alt="Setting" className="sidebar-icon" />
          <span className="sidebar-text">Setting</span>
          <img
            src={`/image/sidebar/${settingsExpanded ? 'arrow-up' : 'arrow-down'}.svg`}
            alt="Toggle"
            className="sidebar-arrow"
          />
        </div>
        {settingsExpanded && (
          <div className="submenu">
            <div className="submenu-item" onClick={() => window.location.href = '/overview'}>Overview</div>
            <div className="submenu-item" onClick={() => window.location.href = '/withdraw'}>Security</div>
            <div className="submenu-item" onClick={() => window.location.href = '/withdraw'}>Identification</div>
            <div className="submenu-item" onClick={() => window.location.href = '/withdraw'}>Account</div>
          </div>
        )}
        <div className="sidebar-item">
          <img src="/image/sidebar/evelope.svg" alt="Envelope" className="sidebar-icon" />
          <span className="sidebar-text">Ticket</span>
        </div>
        <div className="sidebar-item">
          <img src="/image/sidebar/gift.svg" alt="Gift" className="sidebar-icon" />
          <span className="sidebar-text">Rewards</span>
        </div>
      </div>
      <div className="sidebar-footer">
        <img src="/image/sidebar/avatar.png" alt="Avatar" className="avatar-icon" />
        <div className="account-info">
          <div className="account-name">John Doe</div>
          <div className="account-settings">Account Setting</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
