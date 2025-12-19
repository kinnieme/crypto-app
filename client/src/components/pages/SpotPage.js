import React from 'react';
import CryptoTransactionForm from '../features/CryptoTransactionForm';
import './SpotPage.css';

const SpotPage = () => {
  return (
    <div className="spot-page">
      <div className="spot-content">
        {/* First Section */}
        <div className="first-section">
          <div className="first-subsection">
            <img src="/image/spot/1.png" alt="Spot 1" className="spot-image" />
            <img src="/image/spot/2.png" alt="Spot 2" className="spot-image" />
          </div>
          <div className="second-subsection">
            <img src="/image/spot/3.png" alt="Spot 3" className="spot-image" />
          </div>
        </div>
        
        {/* Transaction Forms Section */}
        <div className="transaction-section">
          <div className="buy-form">
            <CryptoTransactionForm type="buy" />
          </div>
          <div className="sell-form">
            <CryptoTransactionForm type="sell" />
          </div>
        </div>
        
        {/* Second Section */}
        <div className="second-section">
          <div className="third-subsection">
            <img src="/image/spot/4.png" alt="Spot 4" className="spot-image" />
          </div>
          <div className="fourth-subsection">
            <img src="/image/spot/5.png" alt="Spot 5" className="spot-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotPage;