import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './SecurityPage.css';
import UserProfileSection from './UserProfileSection';

const SecurityPage = () => {
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    loginPassword: '',
    antiPhishingEnabled: false
  });

  useEffect(() => {
    // Fetch user security data from backend
    const fetchUserData = async () => {
      try {
        // Get user ID from localStorage to fetch user-specific data
        const userId = localStorage.getItem('userId');
        const url = userId ? `/api/user-security/${userId}` : '/api/user-security';
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user security data:', response.statusText);
          // Fallback data in case of error
          setUserData({
            email: '',
            phone: '',
            loginPassword: '',
            antiPhishingEnabled: false
          });
        }
      } catch (error) {
        console.error('Error fetching user security data:', error);
        // Fallback data in case of error
        setUserData({
          email: '',
          phone: '',
          loginPassword: '',
          antiPhishingEnabled: false
        });
      }
    };

    fetchUserData();
  }, []);

  const toggleAntiPhishing = () => {
    setUserData(prev => ({
      ...prev,
      antiPhishingEnabled: !prev.antiPhishingEnabled
    }));
 }

  return (
    <div className="security-page">
      <Sidebar />
      <div className="security-content">
        <div className="main-content">
          {/* Two-Factor Authentication Section */}
          <div className="main-security-section">
            <div className="section-header">
              <h3>Two-Factor Authentication (2FA)</h3>
              <p>Please go to two-factor authentication binding.</p>
            </div>
            
            {/* Email Verification Subsection */}
            <div className="security-subsection">
              <div className="subsection-content">
                <img src="/image/security/mail.png" alt="Email" className="subsection-icon" />
                <div className="subsection-text">
                  <div className="top-text">Email Verification</div>
                  <div className="bottom-text">{userData.email}</div>
                </div>
                <div className="subsection-action">Change</div>
              </div>
            </div>
            <div className="divider-security"></div>
            {/* Phone Number Verification Subsection */}
            <div className="security-subsection">
              <div className="subsection-content">
                <img src="/image/security/phone.png" alt="Phone" className="subsection-icon" />
                <div className="subsection-text">
                  <div className="top-text">Phone Number Verification</div>
                  <div className="bottom-text">
                    <span>{userData.phone}</span>
                  </div>
                </div>
                <div className="subsection-action">Change</div>
              </div>
            </div>
            <div className="divider-security"></div>
            {/* Authenticator App Subsection */}
            <div className="security-subsection">
              <div className="subsection-content">
                <img src="/image/security/key.png" alt="Key" className="subsection-icon" />
                <div className="subsection-text">
                  <div className="top-text">Authenticator App</div>
                  <div className="bottom-text">for login, withdrawals, security, and API</div>
                </div>
                <div className="subsection-action">Change</div>
              </div>
            </div>
          </div>
          {/* Advanced Settings Section */}
          <div className="main-security-section">
            <div className="section-header">
              <h3>Advanced Settings</h3>
              <p>Please go to two-factor authentication binding.</p>
            </div>
            {/* Login Password Subsection */}
            <div className="security-subsection">
              <div className="subsection-content">
                <img src="/image/security/exit.png" alt="Exit" className="subsection-icon" />
                <div className="subsection-text">
                  <div className="top-text">Login password</div>
                  <div className="bottom-text">For protecting account security</div>
                </div>
                <div className="subsection-action">Setting</div>
              </div>
            </div>
            <div className="divider-security"></div>
            {/* Anti-Phishing Code Subsection */}
            <div className="security-subsection">
              <div className="subsection-content">
                <img src="/image/security/anti.png" alt="Anti-Phishing" className="subsection-icon" />
                <div className="subsection-text">
                  <div className="top-text">Anti-Phishing Code</div>
                  <div className="bottom-text">
                    <span>Our emails have an anti-phishing code.</span>
                  </div>
                </div>
                <div className="toggle-switch">
                  <div
                    className={`toggle-slider ${userData.antiPhishingEnabled ? 'enabled' : ''}`}
                    onClick={toggleAntiPhishing}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Third-party Account Management Section */}
          <div className="main-security-section">
            <div className="section-header">
              <h3>Third-party Account Management</h3>
            </div>
            
            {/* Google Subsection */}
            <div className="security-subsection">
              <div className="subsection-content">
                <img src="/image/security/google.png" alt="Google" className="subsection-icon" />
                <div className="subsection-text">
                  <div className="top-text">Google</div>
                  <div className="bottom-text">Log in with Google</div>
                </div>
                <div className="subsection-action">Bind</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;