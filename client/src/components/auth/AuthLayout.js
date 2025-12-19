import React from 'react';
import Sidebar from '../layout/Sidebar';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <Sidebar />
      <div className="content-with-sidebar">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;