import React from 'react';
import './SupportPage.css';

const SupportPage = () => {
  return (
    <div className="support-page">
      <div className="support-content">
        <div className="first-section-support">
          <h1 className="help-title">
            How can we <span className="help-highlight">help</span>?
          </h1>
          <div className="input-container">
            <div className="search-input-wrapper">
              <img src="/image/support/search.png" alt="Search" className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Ask a question"
              />
            </div>
          </div>
        </div>
        <div className="info-section">
          <div className="info-subsection">
            <h2 className="info-title">How to <span className="title-highlight">Deposit</span></h2>
            <p className="info-text">Depositing funds is simple: log in, navigate to the deposit section, select your payment method, enter the details, and confirm. Your funds will be processed promptly.</p>
          </div>
          <div className="info-subsection">
            <h2 className="info-title">How to <span className="title-highlight">Trade</span></h2>
            <p className="info-text">Trading is easy: choose an asset, analyze data, set your amount, and confirm. Leverage our tools and insights to enhance your strategy and make informed decisions.</p>
          </div>
          <div className="info-subsection">
            <h2 className="info-title">Self-<span className="title-highlight">Service</span></h2>
            <p className="info-text">Our self-service options let you manage your account, from settings to reports, with ease. For assistance, explore our knowledge base with guides and FAQs for quick solutions</p>
          </div>
        </div>
        <div className="categories-section">
          <h2 className="categories-title">Categories</h2>
          <div className="categories-content">
            <div className="category-subsection">
              <div className="info-block">
                <img src="/image/support/phone.svg" alt="Change Phone Number" className="info-icon" />
                <span className="info-text-medium">Change Phone Number</span>
              </div>
              <div className="info-block">
                <img src="/image/support/freeze.svg" alt="Freeze Account" className="info-icon" />
                <span className="info-text-medium">Freeze Account</span>
              </div>
              <div className="info-block">
                <img src="/image/support/mail.svg" alt="Didn't Receive Deposits" className="info-icon" />
                <span className="info-text-medium">Didn't Receive Deposits</span>
              </div>
              <div className="info-block">
                <img src="/image/support/mail.svg" alt="Change/Unbind Email" className="info-icon" />
                <span className="info-text-medium">Change/Unbind Email</span>
              </div>
            </div>
            <div className="category-subsection">
              <div className="info-block">
                <img src="/image/support/security.svg" alt="Change Login Password" className="info-icon" />
                <span className="info-text-medium">Change Login Password</span>
              </div>
              <div className="info-block">
                <img src="/image/support/security.svg" alt="Change Login Password" className="info-icon" />
                <span className="info-text-medium">Change Login Password</span>
              </div>
              <div className="info-block">
                <img src="/image/support/profile.svg" alt="Change Profile info" className="info-icon" />
                <span className="info-text-medium">Change Profile info</span>
              </div>
            </div>
            <div className="category-subsection">
              <div className="info-block">
                <img src="/image/support/password.svg" alt="Reset Trading Password" className="info-icon" />
                <span className="info-text-medium">Reset Trading Password</span>
              </div>
              <div className="info-block">
                <img src="/image/support/settings.svg" alt="Reset 2FA" className="info-icon" />
                <span className="info-text-medium">Reset 2FA</span>
              </div>
              <div className="info-block">
                <img src="/image/support/export.svg" alt="Export History" className="info-icon" />
                <span className="info-text-medium">Export History</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;