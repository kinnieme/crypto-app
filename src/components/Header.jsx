import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-container">
          <img src="/image/logo.png" alt="Zyrix Logo" className="logo" />
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item"><a href="/market" className="nav-link">Market</a></li>
            <li className="nav-item"><a href="/spot" className="nav-link">Spot</a></li>
            <li className="nav-item"><a href="/support" className="nav-link">Support</a></li>
            <li className="nav-item"><a href="/learn" className="nav-link">Learn</a></li>
          </ul>
        </nav>
      </div>
      
      <div className="header-right">
        <div className="icon-container">
          <img src="/image/search.png" alt="Search" className="icon" />
        </div>
        <div className="icon-container">
          <img src="/image/earth.png" alt="Earth" className="icon" />
        </div>
        <button className="btn-signup">Sign up</button>
        <button className="btn-login">Log in</button>
      </div>
    </header>
  );
};

export default Header;