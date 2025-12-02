import React from 'react';
import './UserProfileSection.css';

const UserProfileSection = () => {
  const handleIdentityVerificationClick = () => {
    window.location.href = '/identity-verification';
  };

  const handleSecurityClick = () => {
    window.location.href = '/security';
  };

 return (
    <div className="top-section">
      <div className="section-item with-icon">
        <img src="/image/dashboard/avatar.png" alt="Avatar" className="section-icon-avatar" />
        <div className="section-texts">
          <div className="section-title">User ID</div>
          <div className="section-subtitle">123456789</div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="section-item with-icon" onClick={handleIdentityVerificationClick}>
        <div className="section-texts">
          <div className="section-title clickable">Identity Verification</div>
          <div className="section-subtitle unverified">Unverified</div>
        </div>
        <img src="/image/dashboard/arrow-right.svg" alt="Arrow" className="section-icon" onClick={(e) => {
          e.stopPropagation();
          handleIdentityVerificationClick();
        }}/>
      </div>
      <div className="divider"></div>
      <div className="section-item with-icon" onClick={handleSecurityClick}>
        <div className="section-texts">
          <div className="section-title clickable">Security</div>
          <div className="section-subtitle security-low">Low</div>
        </div>
        <img src="/image/dashboard/arrow-right.svg" alt="Arrow" className="section-icon" onClick={(e) => {
          e.stopPropagation();
          handleSecurityClick();
        }}/>
      </div>
      <div className="divider"></div>
      <div className="section-item">
        <div className="section-texts">
          <div className="section-title">Last login</div>
          <div className="section-subtitle">09/16/2025, Austin, Texas</div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="section-item">
        <div className="section-texts">
          <div className="section-title">Time Zone</div>
          <div className="section-subtitle">Chicago (GMT-6)</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;