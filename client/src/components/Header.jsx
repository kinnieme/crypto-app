import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена в localStorage
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-container">
          <Link to="/">
            <img src="/image/header/logo.svg" alt="Zyrix Logo" className="logo" />
          </Link>
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
        {isAuthenticated ? (
          <>
            <div className="icon-container">
              <img src="/image/header/search.png" alt="Search" className="icon" />
            </div>
            <div className="icon-container">
              <img src="/image/header/earth.png" alt="Earth" className="icon" />
            </div>
            <div className="icon-container">
              <img src="/image/header/wallet.svg" alt="Wallet" className="icon" />
            </div>
            <div className="icon-container">
              <img src="/image/header/notify.svg" alt="Notify" className="icon" />
            </div>
            <Link to="/dashboard" className="avatar-container">
              <img src="/image/header/avatar.png" alt="Avatar" className="avatar-icon" />
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="btn-signup">Sign up</Link>
            <Link to="/login" className="btn-login">Log in</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;