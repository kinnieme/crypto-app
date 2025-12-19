import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated } = useAuth();

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
            <li className="nav-item"><Link to="/blog" className="nav-link">Blog</Link></li>
            {isAuthenticated && (
              <>
                <li className="nav-item"><Link to="/market" className="nav-link">Market</Link></li>
                <li className="nav-item"><Link to="/spot" className="nav-link">Spot</Link></li>
                <li className="nav-item"><Link to="/support" className="nav-link">Support</Link></li>
              </>
            )}
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