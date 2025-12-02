import React, { useState } from 'react';
import DepositFAQ from './DepositFAQ';
import './MainDepositSection.css';

const MainDepositSection = () => {
  const [selectedToken, setSelectedToken] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');

  const popularTokens = ['USDT', 'BTC', 'ETH', 'TRX', 'SOL', 'BNB'];

  return (
    <div className="deposit-form">
            <h2>Deposit</h2>
            <div className="form-steps">
              <div className="form-step">
                <div className="step-indicator">1</div>
                <h3>Select the cryptocurrency to deposit</h3>
                <div className="token-selection">
                  <select 
                    className="token-dropdown" 
                    value={selectedToken} 
                    onChange={(e) => setSelectedToken(e.target.value)}
                  >
                    <option className='dropdown' value="" disabled>Select token</option>
                    <option value="USDT">USDT</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="TRX">TRX</option>
                    <option value="SOL">SOL</option>
                    <option value="BNB">BNB</option>
                  </select>
                  <div className="popular-crypto">
                    <h4>Popular Crypto</h4>
                    <div className="token-buttons">
                      {popularTokens.map((token, index) => (
                        <button 
                          key={index} 
                          className={`token-button ${selectedToken === token ? 'selected' : ''}`}
                          onClick={() => setSelectedToken(token)}
                        >
                          {token}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='divider'></div>
            
              <div className="form-step">
                <div className="step-indicator step-23">2</div>
                <h3>Select Network</h3>
              </div>
              <div className='divider'></div>
              <div className="form-step">
                <div className="step-indicator step-23">3</div>
                <h3>Deposit details</h3>
              </div>
            </div>
    </div>
  );
};

export default MainDepositSection;