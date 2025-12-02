import React from 'react';
import Sidebar from './Sidebar';

import './WithdrawPage.css';
import MainDepositSection from './MainDepositSection';
import DepositFAQ from './DepositFAQ';
import MarketTrendsTable from './MarketTrendsTable';

const WithdrawPage = () => {
  return (
    <div className="withdraw-page">
      <Sidebar />
      <div className="withdraw-content">
        <div className='withdraw-container'>
          <MainDepositSection/>
          <DepositFAQ/>
        </div>
        <MarketTrendsTable/>
      </div>
    </div>
  );
};

export default WithdrawPage;