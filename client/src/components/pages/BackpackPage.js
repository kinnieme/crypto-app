import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import './BackpackPage.css';

const BackpackPage = () => {
  const { isAuthenticated } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAssets = async () => {
      try {
        // Get user ID from localStorage (similar to other pages)
        const userId = localStorage.getItem('userId');
        console.log('Current user ID from localStorage:', userId);
        
        if (!isAuthenticated || !userId) {
          throw new Error('User not authenticated');
        }

        console.log('Fetching assets for user ID:', userId);
        
        const response = await fetch(`/api/user-assets/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', errorText);
          throw new Error(`Failed to fetch user assets: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        console.log('Fetched assets data:', data);
        setAssets(data);
      } catch (err) {
        console.error('Error fetching assets:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    console.log('BackpackPage mounted, isAuthenticated:', isAuthenticated);
    if (isAuthenticated) {
      fetchUserAssets();
    } else {
      setLoading(false); // Stop loading if user is not authenticated
    }
  }, [isAuthenticated]);

  if (loading) {
    return <div className="backpack-page">Loading...</div>;
  }

  if (error) {
    return <div className="backpack-page">Error: {error}</div>;
  }

  return (
    <div className="backpack-page">
      <h1>User Assets</h1>
      <table className="assets-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Crypto Type</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset, index) => (
              <tr key={index}>
                <td>{asset.user_id}</td>
                <td>{asset.crypto_type}</td>
                <td>{parseFloat(asset.amount).toFixed(8)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No assets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BackpackPage;