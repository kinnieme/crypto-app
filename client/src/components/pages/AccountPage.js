import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import Sidebar from '../layout/Sidebar';
import './AccountPage.css';
import UserProfileSection from '../shared/UserProfileSection';

const AccountPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const handleLogout = () => {
    // Use the logout function from auth context
    logout();
    // Also remove userId from localStorage
    localStorage.removeItem('userId');
    // Redirect to the home page or login page
    navigate('/');
  };
  
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Fetch user account data from backend
    const fetchUserData = async () => {
      try {
        console.log('Fetching user account data...');
        // Get user ID from localStorage
        const userId = localStorage.getItem('userId');
        const url = userId ? `/api/user-account/${userId}` : '/api/user-account';
        const response = await fetch(url);
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Received data:', data);
        setUserData(data);
        setEditData(data);
      } catch (error) {
        console.error('Error fetching user account data:', error);
        // Fallback data in case of error
        const fallbackData = {
          first_name: '',
          last_name: '',
          email: '',
          phone: ''
        };
        setUserData(fallbackData);
        setEditData(fallbackData);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    console.log('Save button clicked');
    console.log('Edit data:', editData);
    try {
      // Get user ID from localStorage
      const userId = localStorage.getItem('userId');
      const url = userId ? `/api/user-account/${userId}` : '/api/user-account';
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      console.log('Save response status:', response.status);
      if (response.ok) {
        const updatedData = await response.json();
        console.log('Updated data received:', updatedData);
        setUserData(updatedData);
        setEditData(updatedData); // Update editData as well to avoid inconsistency
        setIsEditing(false);
        console.log('User account data updated successfully');
      } else {
        console.error('Error updating user account data:', response.status);
        // Try to get error message from response
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    } catch (error) {
      console.error('Error updating user account data:', error);
    }
  };

  const handleCancelClick = () => {
    setEditData({ ...userData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="account-page">
      <Sidebar />
      <div className="account-content">
        <div className="main-content">
          <UserProfileSection />
          <h2 className="account-title">Account Info</h2>
          
          <div className="account-info-section">
            <table className="account-table">
              <tbody>
                <tr>
                  <td className="field-label">First name</td>
                  <td className="field-value">
                    {isEditing ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={editData.first_name}
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                      />
                    ) : (
                      userData.first_name
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="field-label">Last Name</td>
                  <td className="field-value">
                    {isEditing ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={editData.last_name}
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                      />
                    ) : (
                      userData.last_name
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="field-label">Email address</td>
                  <td className="field-value">
                    {isEditing ? (
                      <input
                        type="email"
                        className="edit-input"
                        value={editData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      userData.email
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="field-label">Phone</td>
                  <td className="field-value">
                    {isEditing ? (
                      <input
                        type="text"
                        className="edit-input"
                        value={editData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      userData.phone
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            
            <div className="button-container">
              {isEditing ? (
                <>
                  <button className="edit-button save-button" onClick={handleSaveClick}>
                    <img src="/image/account/edit.svg" alt="Save" className="button-icon" />
                    Save
                  </button>
                  <button className="edit-button cancel-button" onClick={handleCancelClick}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="edit-button" onClick={handleEditClick}>
                  <img src="/image/account/edit.svg" alt="Edit" className="button-icon" />
                  Edit
                </button>
              )}
            </div>
          </div>
          
          {/* Logout Section */}
          <div className="logout-section" style={{marginTop: '30px'}}>
            <h3>Session Management</h3>
            <button className="logout-button" onClick={handleLogout}>LOG OUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;