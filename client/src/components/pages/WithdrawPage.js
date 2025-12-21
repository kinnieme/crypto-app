import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import './WithdrawPage.css';

const WithdrawPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedToken, setSelectedToken] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [isAmountEntered, setIsAmountEntered] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const popularTokens = ['USDT', 'BTC', 'ETH', 'TRX', 'SOL', 'BNB'];

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setCryptoAmount(value);
    // Enable sell button when amount is entered
    setIsAmountEntered(value.trim() !== '');
  };

  const handleSell = async () => {
    if (!selectedToken || !cryptoAmount) {
      setError('Please select a token and enter an amount.');
      setMessage('');
      return;
    }

    const amount = parseFloat(cryptoAmount);
    if (isNaN(amount) || amount < 1 || amount > 100) {
      setError('Please enter an amount between 1 and 100.');
      setMessage('');
      return;
    }

    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User not authenticated.');
        setMessage('');
        return;
      }

      // Get user's current balance for the selected token
      const assetsResponse = await fetch(`/api/user-assets/${userId}`);
      if (!assetsResponse.ok) {
        throw new Error('Failed to fetch user assets');
      }
      const assets = await assetsResponse.json();
      const userAsset = assets.find(asset => asset.crypto_type === selectedToken);
      const currentBalance = userAsset ? parseFloat(userAsset.amount) : 0;

      if (amount > currentBalance) {
        setError(`Insufficient funds. You have ${currentBalance} ${selectedToken}, but tried to sell ${amount} ${selectedToken}.`);
        setMessage('');
        return;
      }

      // Send sell request to server
      const response = await fetch('/api/sell-crypto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          token: selectedToken,
          amount: amount
        })
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Sale successful!');
        setError('');
        // Reset form
        setCryptoAmount('');
        setIsAmountEntered(false);
      } else {
        const error = await response.json();
        setError(`Sale failed: ${error.message}`);
        setMessage('');
      }
    } catch (error) {
      console.error('Error selling crypto:', error);
      setError('An error occurred during sale.');
      setMessage('');
    }
  };

  return (
    <div className='deposit-page'>
      <div className='deposit-content'>
        <div className='main-withdraw-section'>
          <div className="withdraw-form">
            <h2>Withdraw</h2>
            <div className="form-steps">
              <div className="form-step">
                <div className="step-indicator">1</div>
                <h3>Select the cryptocurrency to sell</h3>
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
                <h3>Enter Amount</h3>
                <div className="amount-input-container">
                  <input
                    type="number"
                    className={`amount-input ${selectedToken ? 'active' : ''}`}
                    placeholder="Enter amount (1-100)"
                    value={cryptoAmount}
                    onChange={handleAmountChange}
                    disabled={!selectedToken}
                    min="1"
                    max="100"
                    step="1"
                  />
                </div>
              </div>
              <div className='divider'></div>
              <div className="form-step">
                <div className="step-indicator step-23">3</div>
                <h3>Confirm Sale</h3>
                <div className="sell-button-container">
                  <button
                    className={`sell-button ${selectedToken && isAmountEntered ? 'active' : ''}`}
                    onClick={handleSell}
                    disabled={!selectedToken || !isAmountEntered}
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}
          </div>
        </div>
      </div>
    </div>

  );
};

export default WithdrawPage;