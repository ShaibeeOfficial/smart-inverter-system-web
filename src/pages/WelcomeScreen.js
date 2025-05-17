// src/pages/WelcomeScreen.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeScreen.css';
import logo from '../assets/your-logo.png';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <img src={logo} alt="Smart Inverter Logo" className="welcome-logo fade-in" />
      <h1 className="welcome-text fade-in">Welcome to Smart Inverter</h1>
      <p className="welcome-subtext fade-in">
        Monitoring your solar system, anytime, anywhere.
      </p>
      <div className="loader"></div>
    </div>
  );
};

export default WelcomeScreen;
