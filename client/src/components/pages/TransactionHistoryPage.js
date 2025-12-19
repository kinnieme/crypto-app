import React from 'react';
import MarketTrendsTable from '../features/MarketTrendsTable';
import './TransactionHistoryPage.css';

const TransactionHistoryPage = () => {
  return (
    <div className="transaction-history-page">
      <div className="transaction-history-content">
        <h2 className="transaction-history-title">Transaction History</h2>
        <div className="market-trends-wrapper">
          <MarketTrendsTable />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;