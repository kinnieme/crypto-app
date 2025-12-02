import React from 'react';
import './HomePage.css';
import MarketTrendsTable from './MarketTrendsTable';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="header-placeholder"></div>
      <div className="home-content">
        <h1 className="main-title">
          Trade, Invest, and Build <br />
          Your <span className="highlight">Future!</span>
        </h1>
        <div className="subtitle">
          <span className="subtitle-word">Safe</span>
          <span className="subtitle-word">Fast</span>
          <span className="subtitle-word">Stable</span>
          <span className="subtitle-word">Reliable</span>
        </div>
        <button className="start-trading-btn">Start Trading</button>
      </div>
      <div className="background-image"></div>
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">150</div>
            <div className="stat-label">Countries Covered</div>
          </div>
          <div className="divider-home"></div>
          <div className="stat-item">
            <div className="stat-number">30M</div>
            <div className="stat-label">Global Investors</div>
          </div>
          <div className="divider-home"></div>
          <div className="stat-item">
            <div className="stat-number">700+</div>
            <div className="stat-label">Coins</div>
          </div>
          <div className="divider-home"></div>
          <div className="stat-item">
            <div className="stat-number">$1.54B</div>
            <div className="stat-label">24h Trading Volume</div>
          </div>
        </div>
      </div>
      <div className="main-images-section">
        <div className="container-wrapper">
          <h2 className="section-title"><span className="highlight">Powering</span> Your Crypto Journey</h2>
          <div className="first-image-set">
            <img src="/image/home/home1.png" alt="Home 1" className="section-image" />
            <img src="/image/home/home2.png" alt="Home 2" className="section-image" />
            <img src="/image/home/home3.png" alt="Home 3" className="section-image" />
          </div>
          <div className="second-image-set">
            <img src="/image/home/home4.png" alt="Home 4" className="section-image" />
          </div>
        </div>
      </div>
      <MarketTrendsTable />
      <div className="comments-section">
        <img src="/image/home/Coments.png" alt="Comments" className="comments-image" />
      </div>
      <div className="faq-section">
        <h2 className="faq-title">Frequently Asked <span className="highlight">Questions</span></h2>
        <img src="/image/home/faq.png" alt="FAQ" className="faq-image" />
      </div>
      <div className="support-button-container">
        <a href="/support"><img src="/image/home/support.svg" alt="Support" className="support-button" /></a>
      </div>
    </div>
  );
};

export default HomePage;