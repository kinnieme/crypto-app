import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import './OverviewPage.css';
import UserProfileSection from './UserProfileSection';
import './OverviewPage.css';

const OverviewPage = () => {
  const [loginActivityData, setLoginActivityData] = useState([]);

  useEffect(() => {
    // Fetch login activity data from backend
    const fetchLoginActivity = async () => {
      try {
        const response = await fetch('/api/login-activity');
        const data = await response.json();
        setLoginActivityData(data);
      } catch (error) {
        console.error('Error fetching login activity:', error);
        // Fallback data in case of error
        setLoginActivityData([
          { id: 1, time: '2025-04-24 19:50:45', status: 'Success', ip: '192.72.134.201' },
          { id: 2, time: '2025-04-23 14:2:11', status: 'Fail', ip: '104.16.201.8' },
          { id: 3, time: '2025-04-22 09:15:33', status: 'Success', ip: '72.21.214.11' },
          { id: 4, time: '2025-04-21 22:40:57', status: 'Success', ip: '185.64.12.55' },
          { id: 5, time: '2025-04-20 06:05:02', status: 'Fail', ip: '45.91.184.62' }
        ]);
      }
    };

    fetchLoginActivity();
  }, []);

  return (
    <div className="overview-page">
      <Sidebar />
      <div className="overview-content">
        <div className="main-content">
          <UserProfileSection />
          <div className="overview-sections">
            <div className="overview-subsection">
              <img src="/image/overview/security.png" alt="Security" className="subsection-icon" />
              <div className="subsection-content">
                <div className="subsection-top-text">Security Center</div>
                <div className="subsection-bottom-text">
                  <div>Your current security Level</div>
                  <div className="security-level">Low</div>
                </div>
              </div>
              <div className="subsection-action">Upgrade</div>
            </div>
            <div className="overview-subsection">
              <img src="/image/overview/identication.png" alt="Identification" className="subsection-icon" />
              <div className="subsection-content">
                <div className="subsection-top-text">Identification</div>
                <div className="subsection-bottom-text">
                  <div>Verification level</div>
                  <div className="verification-level">Unverified</div>
                </div>
              </div>
              <div className="subsection-action">Verify now</div>
            </div>
            <div className="overview-subsection">
              <img src="/image/overview/preference.png" alt="Preference" className="subsection-icon" />
              <div className="subsection-content">
                <div className="subsection-top-text">Preference Settings</div>
                <div className="subsection-bottom-text">
                  <div>Verification level</div>
                </div>
              </div>
              <div className="subsection-action">Manage</div>
            </div>
          </div>
          <div className="login-activity-section">
            <h2>Log In Activity</h2>
            <table className="login-activity-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Login Status</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {loginActivityData && Array.isArray(loginActivityData) && loginActivityData.map((activity, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(activity.time).toLocaleString()}
                    </td>
                    <td style={{ color: activity.status === 'Success' ? '#4CAF50' : '#D32F2F' }}>
                      {activity.status}
                    </td>
                    <td>{activity.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;