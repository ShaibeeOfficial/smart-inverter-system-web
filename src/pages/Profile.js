import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Header from '../components/Header';
import { FaUserCircle } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };


  return (
    <div>
      <Header />
      <div className="profile-wrapper">
        <div className="profile-glass-card">
          <div className="profile-avatar-wrapper">
            <FaUserCircle className="profile-avatar" />
            <h1 className="profile-name">Umair</h1>
            <p className="profile-email">umair@gmail.com</p>
          </div>

          <div className="profile-details">
            <div className="detail-row">
              <label style={{color:'#000'}}>Name</label>
              <span style={{color:'#000'}}>Umair</span>
            </div>
            <div className="detail-row">
              <label style={{color:'#000'}}>Email</label>
              <span style={{color:'#000'}}>umair@gmail.com</span>
            </div>
          </div>

          <div className="profile-actions">
            <button className="btn-primary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
