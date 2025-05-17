import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/header-logo.png';
import './Header.css';
import { auth } from '../firebase';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <header className="header-container">
      <div className="logo" onClick={() => navigate('/dashboard')}>
        <img src={logo} alt="Smart Inverter Logo" />
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <NavLink to="/voltage" className={({ isActive }) => isActive ? 'active-link' : ''}>Voltage</NavLink>
        <NavLink to="/ampere" className={({ isActive }) => isActive ? 'active-link' : ''}>Ampere</NavLink>
        <NavLink to="/battery" className={({ isActive }) => isActive ? 'active-link' : ''}>Battery</NavLink>
        <NavLink to="/status" className={({ isActive }) => isActive ? 'active-link' : ''}>Status</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active-link' : ''}>Profile</NavLink>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </header>
  );
};

export default Header;
