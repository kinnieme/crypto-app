import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import './CryptoTransactionForm.css';

const CryptoTransactionForm = ({ type = 'buy' }) => {
  const { isAuthenticated } = useAuth();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Crypto options
  const cryptoOptions = [
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'USDT', label: 'Tether' },
    { value: 'XRP', label: 'Ripple' },
    { value: 'DOGE', label: 'Dogecoin' }
 ];

  // Get user ID from localStorage
  useEffect(() => {
    if (isAuthenticated) {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/${type === 'buy' ? 'purchase-crypto' : 'sell-crypto'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(userId),
          token: selectedCrypto,
          amount: parseFloat(amount)
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || `${type === 'buy' ? 'Purchase' : 'Sale'} successful!`);
        setAmount('');
      } else {
        setError(data.message || data.error || `${type === 'buy' ? 'Purchase' : 'Sale'} failed`);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(`Error ${type === 'buy' ? 'purchasing' : 'selling'} crypto:`, err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="transaction-form-container">
        <p>Please log in to {type} cryptocurrencies</p>
      </div>
    );
  }

  return (
    <div className="transaction-form-container">
      <h3>{type === 'buy' ? 'Buy' : 'Sell'} Cryptocurrency</h3>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label htmlFor="crypto-select">Select Cryptocurrency:</label>
          <select
            id="crypto-select"
            value={selectedCrypto}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="form-control"
          >
            {cryptoOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label} ({option.value})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            step="0.0000001"
            min="0"
            className="form-control"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className={`submit-button ${type}`}
        >
          {loading ? 'Processing...' : `${type === 'buy' ? 'Buy' : 'Sell'} ${selectedCrypto}`}
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
};

export default CryptoTransactionForm;