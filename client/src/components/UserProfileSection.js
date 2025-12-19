import React, { useState, useEffect } from 'react';
import './UserProfileSection.css';

const UserProfileSection = () => {
  const [userId, setUserId] = useState('');
  const [lastLogin, setLastLogin] = useState('');

  const handleIdentityVerificationClick = () => {
    window.location.href = '/identification';
  };

  const handleSecurityClick = () => {
    window.location.href = '/security';
  };

  useEffect(() => {
    // Get user ID from localStorage (stored during login/signup)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Fallback: fetch user ID from API if not in localStorage
      const fetchUserId = async () => {
        try {
          const response = await fetch('/api/user-id');
          if (response.ok) {
            const data = await response.json();
            const userIdValue = data.userId || 'N/A';
            setUserId(userIdValue);
            // Store in localStorage for future use
            localStorage.setItem('userId', userIdValue);
          } else {
            setUserId('N/A');
          }
        } catch (error) {
          console.error('Error fetching user ID:', error);
          setUserId('N/A');
        }
      };

      fetchUserId();
    }

    // Fetch last login activity
    const fetchLastLogin = async () => {
      try {
        const response = await fetch('/api/login-activity');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Get the most recent successful login
            const recentLogin = data.find(activity => activity.status === 'Success') || data[0];
            if (recentLogin) {
              // Format the time and location
              const loginTime = new Date(recentLogin.time).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              });
              setLastLogin(`${loginTime}, IP: ${recentLogin.ip}`);
            } else {
              setLastLogin('No login records');
            }
          } else {
            setLastLogin('No login records');
          }
        } else {
          setLastLogin('N/A');
        }
      } catch (error) {
        console.error('Error fetching login activity:', error);
        setLastLogin('N/A');
      }
    };

    fetchLastLogin();
  }, []); // Run once when component mounts

  return (
    <div className="top-section">
      <div className="section-item with-icon">
        <img src="/image/dashboard/avatar.png" alt="Avatar" className="section-icon-avatar" />
        <div className="section-texts">
          <div className="section-title">User ID</div>
          <div className="section-subtitle">{userId}</div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="section-item with-icon" onClick={handleIdentityVerificationClick}>
        <div className="section-texts">
          <div className="section-title clickable">Identity Verification</div>
          <div className="section-subtitle unverified">Unverified</div>
        </div>
        <img src="/image/dashboard/arrow-right.svg" alt="Arrow" className="section-icon" onClick={(e) => {
          e.stopPropagation();
          handleIdentityVerificationClick();
        }}/>
      </div>
      <div className="divider"></div>
      <div className="section-item with-icon" onClick={handleSecurityClick}>
        <div className="section-texts">
          <div className="section-title clickable">Security</div>
          <div className="section-subtitle security-low">Low</div>
        </div>
        <img src="/image/dashboard/arrow-right.svg" alt="Arrow" className="section-icon" onClick={(e) => {
          e.stopPropagation();
          handleSecurityClick();
        }}/>
      </div>
      <div className="divider"></div>
      <div className="section-item">
        <div className="section-texts">
          <div className="section-title">Last login</div>
          <div className="section-subtitle">{lastLogin}</div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="section-item">
        <div className="section-texts">
          <div className="section-title">Time Zone</div>
          <div className="section-subtitle">Chicago (GMT-6)</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;