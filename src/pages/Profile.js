import React from 'react';
import { auth } from '../firebase'; // Ensure firebase is initialized
import { useNavigate } from 'react-router-dom'; // For navigating back to the dashboard or previous page
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate(); // useNavigate is used instead of useHistory

  const handleLogout = () => {
    auth.signOut();
    navigate('/'); // Redirect to login page after logout
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page (similar to history.goBack() in v5)
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h2>Welcome to Your Profile</h2>
        </div>
        <div className="profile-info">
          <div className="profile-item">
            <label>Name:</label>
            <span>Umair</span>
          </div>
          <div className="profile-item">
            <label>Email:</label>
            <span>umair@gmail.com</span>
          </div>
        </div>
        <div className="profile-footer">
          <button className="back-btn" onClick={handleBack}>Back</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
