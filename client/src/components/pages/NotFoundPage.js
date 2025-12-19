import React from 'react';
import Sidebar from '../layout/Sidebar';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-container">
          <img 
            src="/image/404/404.png" 
            alt="404 Not Found" 
            className="not-found-image"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;