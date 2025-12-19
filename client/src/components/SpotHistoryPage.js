import React from 'react';
import Sidebar from './Sidebar';
import MarketTrendsTable from './MarketTrendsTable';
import './SpotHistoryPage.css';

const SpotHistoryPage = () => {
  return (
    <div className="spot-history-page">
      <Sidebar />
      <div className="spot-history-content">
        <h2 className="spot-history-title">Spot History</h2>
        <div className="market-trends-wrapper">
          <MarketTrendsTable />
        </div>
      </div>
    </div>
  );
};

export default SpotHistoryPage;