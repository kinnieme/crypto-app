import React from 'react';
import MarketTrendsTable from './MarketTrendsTable';
import './MarketPage.css';

const MarketPage = () => {
  return (
    <div className="market-page">
      <div className="market-content">
        <h2 className="markets-overview-title">Markets Overview</h2>
        <div className="market-top-section">
          <div className="first-subsection">
            <img src="/image/market/1.png" alt="Market 1" className="market-image" />
          </div>
          <div className="second-subsection">
            <div className="upper-subsection">
              <img src="/image/market/2.png" alt="Market 2" className="market-image" />
              <img src="/image/market/3.png" alt="Market 3" className="market-image" />
            </div>
            <div className="lower-subsection">
              <img src="/image/market/4.png" alt="Market 4" className="market-image" />
            </div>
          </div>
        </div>
        <MarketTrendsTable />
      </div>
    </div>
  );
};

export default MarketPage;