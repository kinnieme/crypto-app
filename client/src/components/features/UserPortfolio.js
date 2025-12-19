import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import './UserPortfolio.css';

const UserPortfolio = () => {
  const { isAuthenticated } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserAssets = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user-assets/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAssets(data);
      } catch (err) {
        console.error('Error fetching user assets:', err);
        setError('Failed to fetch user assets');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAssets();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="portfolio-container">
        <p>Please log in to view your portfolio</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="portfolio-container">
        <h2>Your Portfolio</h2>
        <p>Loading your assets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-container">
        <h2>Your Portfolio</h2>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      <h2>Your Portfolio</h2>
      {assets.length > 0 ? (
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Cryptocurrency</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => (
              <tr key={index}>
                <td>{asset.crypto_type}</td>
                <td>{parseFloat(asset.amount).toFixed(8)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You don't have any assets yet. Start trading to build your portfolio!</p>
      )}
    </div>
  );
};

export default UserPortfolio;