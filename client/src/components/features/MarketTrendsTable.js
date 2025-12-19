import React, { useState, useEffect } from 'react';
import './MarketTrendsTable.css';

// Helper function to get asset symbol based on name
const getAssetSymbol = (name) => {
  const symbols = {
    'Bitcoin': 'BTC',
    'Ethereum': 'ETH',
    'Tether': 'USDT',
    'Ripple': 'XRP',
    'Dogecoin': 'DOGE'
  };
  return symbols[name] || '';
};

const MarketTrendsTable = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarketTrends = async () => {
      try {
        const response = await fetch('/api/market-trends');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAssets(data);
      } catch (err) {
        console.error('Error fetching market trends:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketTrends();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(fetchMarketTrends, 30000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="market-trends-section">
        <h2 className="market-trends-title"><span className="highlight">Market</span> Trend</h2>
        <div className="table-container">
          Loading market trends...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="market-trends-section">
        <h2 className="market-trends-title"><span className="highlight">Market</span> Trend</h2>
        <div className="table-container">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="market-trends-section">
      <h2 className="market-trends-title"><span className="highlight">Market</span> Trend</h2>
      <div className="table-container">
        <table className="trends-table">
          <thead>
            <tr>
              <th className="trend-th">#</th>
              <th className="trend-th">Name</th>
              <th className="trend-th">Price</th>
              <th className="trend-th">24h Changes</th>
              <th className="trend-th">Chart</th>
              <th className="trend-th">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="horizontal-divider"></td>
            </tr>
            {assets.length > 0 ? (
              assets.map((asset) => (
                <tr key={asset.id}>
                  <td className="trend-td">{asset.rank}</td>
                  <td className="trend-td">
                    <div className="asset-name">
                      <img src={`/image/iconsCrypto/${asset.name}.svg`} alt={asset.name} className="crypto-icon" />
                      <div className="asset-info">
                        <span className="asset-full-name">{asset.name}</span>
                        <span className="asset-symbol">{getAssetSymbol(asset.name)}</span>
                      </div>
                    </div>
                  </td>
                  <td className="trend-td">${asset.price}</td>
                  <td className="trend-td">
                    <span className={parseFloat(asset.change_24h) < 0 ? 'negative-change' : 'positive-change'}>
                      {asset.change_24h}%
                    </span>
                  </td>
                  <td className="trend-td chart-td">
                    <img
                      src={`/image/home/${parseFloat(asset.change_24h) < 0 ? 'negativeChart' : 'positiveChart'}.png`}
                      alt={`${parseFloat(asset.change_24h) < 0 ? 'Negative' : 'Positive'} Chart`}
                      className="chart-image"
                    />
                  </td>
                  <td className="trend-td action-cell">
                    <button className="action-btn">Trade</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTrendsTable;