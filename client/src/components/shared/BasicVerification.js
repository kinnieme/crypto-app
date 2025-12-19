import React from 'react';
import './BasicVerification.css';

const BasicVerification = () => {
  const benefits = [
    { text: '24h Withdraw limit', value: '5 BTC' },
    { text: '24h Deposit limit', value: 'No Limit' },
    { text: 'Get Crypto with Fiat', value: 'Permit' },
    { text: 'other', value: 'More Trial Fund' }
 ];

  return (
    <div className="basic-verification-section">
      <div className="section-header">
        <h2 className="section-title">Basic Verification</h2>
        <button className="verify-button">Verify Now</button>
      </div>
      
      <div className="benefits-section">
        <div className="benefits-header">
          <img 
            src="/image/identification/ellipse.png" 
            alt="Ellipse" 
            className="benefits-icon" 
          />
          <span className="benefits-title">Benefits</span>
        </div>
        
        <div className="benefits-list">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-text">
                <span className="benefit-name">{benefit.text}</span>
                <span className="benefit-value">{benefit.value}</span>
              </div>
              <img 
                src="/image/identification/CheckBox.png" 
                alt="Check" 
                className="check-icon" 
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="requirements-section">
        <div className="requirements-header">
          <img 
            src="/image/identification/ellipse.png" 
            alt="Ellipse" 
            className="requirements-icon" 
          />
          <span className="requirements-title">Requirement</span>
        </div>
        
        <div className="promo-card">
          <img 
            src="/image/identification/human.png" 
            alt="Human" 
            className="promo-icon" 
          />
          <span className="promo-text">Basic Authentication Info</span>
        </div>
      </div>
    </div>
  );
};

export default BasicVerification;