import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import './IdentificationPage.css';
import UserProfileSection from './UserProfileSection';
import BasicVerification from './BasicVerification';

const IdentificationPage = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // In a real application, we would get the user ID from the authenticated session
    // For now, we'll fetch a placeholder user ID from the database
    const fetchUserId = async () => {
      try {
        const response = await fetch('/api/user-id');
        const data = await response.json();
        setUserId(data.userId || 'Error'); // fallback if no data
      } catch (error) {
        console.error('Error fetching user ID:', error);
        setUserId('Error'); // fallback if error
      }
    };

    fetchUserId();
  }, []);

  const faqItems = [
    "Why is identity verification necessary?",
    "Why isn't my country/region listed?",
    "What are the restrictions of identity verification?"
  ];

  const handleFaqClick = (index) => {
    // Handle FAQ click - in a real app this might expand the answer
    console.log(`FAQ clicked: ${faqItems[index]}`);
  };

  return (
    <div className="identification-page">
      <Sidebar />
      <div className="identification-content">
        <div className="main-content-identification">
          
          {/* Identification Section */}
          <div className="main-identification-section">
            <div className="identification-content-wrapper">
              {/* Text Content */}
              <div className="text-content">
                <h2 className="identification-title">Identification</h2>
                <p className="user-id-text">User ID: {userId}</p>
                <p className="description-text">A crypto ID shows user info<br></br> and security.</p>
              </div>
              
              {/* Background Image */}
              <div className="background-image-container">
                <img 
                  src="image\identification\Illustration.png" 
                  alt="Identification" 
                  className="background-image-identification" 
                />
              </div>
            </div>
          </div>
          
          {/* Withdrawal FAQ Section */}
          <div className="main-identification-section">
            <div className="faq-content-wrapper">
              {/* Header and Button */}
              <div className="faq-header-section">
                <h2 className="faq-title">Withdrawal FAQ</h2>
                <button className="action-button">View More</button>
              </div>
              
              {/* FAQ Items */}
              <div className="faq-items-section">
                {faqItems.map((faq, index) => (
                  <div
                    key={index}
                    className="faq-item"
                    onClick={() => handleFaqClick(index)}
                  >
                    {faq}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <BasicVerification />
        <BasicVerification />
      </div>
    </div>
  );
};

export default IdentificationPage;