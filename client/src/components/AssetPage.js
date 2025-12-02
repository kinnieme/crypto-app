import React from 'react';
import Sidebar from './Sidebar';
import MarketTrendsTable from './MarketTrendsTable';
import './AssetPage.css';

const AssetPage = () => {
  return (
    <div className="asset-page">
      <Sidebar />
      <div className="asset-content">
        <div className="asset-header-section">
          <div className="asset-images-container">
            <div>
              <img src="/image/asset/asset.png" alt="Asset" className="asset-image" />
            </div>
            <div>
              <img src="/image/asset/total.png" alt="Total" className="asset-image" />
            </div>
          </div>
        </div>
        <MarketTrendsTable />
      </div>
    </div>
  );
};

export default AssetPage;