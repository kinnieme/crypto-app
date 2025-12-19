import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Верхняя часть футера с логотипом и иконками соцсетей */}
      <div className="footer-top">
        <div className="footer-left">
          <img src="/image/footer/icons/logo.svg" alt="Zyrix Logo" className="footer-logo" />
        </div>
        <div className="footer-divider"></div>
        <div className="footer-right">
          <div className="social-icons">
            <img src="/image/footer/icons/inst.svg" alt="Instagram" className="social-icon" />
            <img src="/image/footer/icons/facebook.svg" alt="Facebook" className="social-icon" />
            <img src="/image/footer/icons/x.svg" alt="X" className="social-icon" />
            <img src="/image/footer/icons/in.svg" alt="LinkedIn" className="social-icon" />
            <img src="/image/footer/icons/telegram.svg" alt="Telegram" className="social-icon" />
          </div>
        </div>
      </div>

      {/* Навигационные ссылки */}
      <div className="footer-navigation">
        <div className="nav-column">
          <h3 className="nav-category">Services</h3>
          <a href="/exchange" className="nav-link">Exchange</a>
          <a href="/spot" className="nav-link">Spot</a>
          <a href="/p2ptrading" className="nav-link">P2P Trading</a>
          <a href="/securities" className="nav-link">Securities Trading</a>
        </div>
        <div className="nav-column">
          <h3 className="nav-category">Product</h3>
          <a href="/mobile" className="nav-link">Mobile App</a>
          <a href="/lending" className="nav-link">Lending Pro</a>
          <a href="/reporting" className="nav-link">Reporting APP</a>
        </div>
        <div className="nav-column">
          <h3 className="nav-category">Company</h3>
          <a href="/about" className="nav-link">About</a>
          <a href="/affiliates" className="nav-link">Affiliates</a>
          <a href="/careers" className="nav-link">Careers</a>
          <a href="/announcement" className="nav-link">Announcement</a>
          <a href="/privacypolicy" className="nav-link">Privacy Policy</a>
        </div>
        <div className="nav-column">
          <h3 className="nav-category">Support</h3>
          <a href="/help" className="nav-link">Help Center</a>
          <a href="/contact" className="nav-link">Contact Us</a>
          <a href="/status" className="nav-link">Status</a>
          <a href="/404" className="nav-link" >Learn</a>
        </div>
      </div>

      {/* Разделительная линия под навигацией */}
      <div className="footer-mid-divider"></div>

      {/* Копирайт */}
      <div className="footer-bottom">
        <p className="copyright">Copy Right 2013-2025 Zyrix lnc. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;