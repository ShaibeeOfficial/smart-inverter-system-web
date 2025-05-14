// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Link from react-router-dom
import './Sidebar.css'; // Sidebar CSS

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3>Welcome, Umar</h3>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      <div className="sidebar-menu">
        <Link to="/profile" ><button className="sidebar-btn profile-link">Profile</button></Link>
        <button className="sidebar-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
