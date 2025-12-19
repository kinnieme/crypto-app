import React from 'react';
import Sidebar from './Sidebar';
import './NotificationPage.css';

const NotificationPage = () => {
  const notifications = [
    {
      id: 1,
      title: "New Listing",
      time: "2025-12-25 19:47:06",
      message: "SKICAT/USDT trading is live! Trade now",
      icon: "/image/notification/notification.svg"
    },
    {
      id: 2,
      title: "New Listing",
      time: "2025-12-24 15:30:12",
      message: "NEWCOIN/USDC trading is live! Trade now",
      icon: "/image/notification/notification.svg"
    },
    {
      id: 3,
      title: "New Listing",
      time: "2025-12-23 11:15:45",
      message: "ALTCON/BTC trading is live! Trade now",
      icon: "/image/notification/notification.svg"
    },
    {
      id: 4,
      title: "New Listing",
      time: "2025-12-22 08:22:33",
      message: "DEFI/ETH trading is live! Trade now",
      icon: "/image/notification/notification.svg"
    },
    {
      id: 5,
      title: "New Listing",
      time: "2025-12-21 14:55:09",
      message: "MEMECOIN/USDT trading is live! Trade now",
      icon: "/image/notification/notification.svg"
    }
  ];

  return (
    <div className="notification-page">
      <Sidebar />
      <div className="notification-content">
        <div className="main-notification-section">
          <div className="header-section">
            <img src="/image/notification/arrow-left.svg" alt="Back" className="back-icon" />
            <h2 className="notification-title">Notification</h2>
          </div>
        </div>
        <div className="notification-list-section">
          {notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <div className="notification-header">
                <div className="notification-header-left">
                  <img src={notification.icon} alt="Notification" className="notification-icon" />
                  <span className="notification-title-text">{notification.title}</span>
                </div>
                <span className="notification-time">{notification.time}</span>
              </div>
              <div className="notification-message">
                {notification.message}
              </div>
              <div className="notification-action">
                <button className="trade-button">Trade now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;