// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Profile Icon
import { Link } from 'react-router-dom'; // Link from react-router-dom
import Sidebar from '../components/Sidebar'; // Sidebar Component
import { auth } from "../firebase"; // Import Firebase auth
import { useNavigate } from 'react-router-dom'; // For navigating back to the dashboard or previous page
import './Dashboard.css'; // Dashboard CSS

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate is used instead of useHistory

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName || 'User');
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/'); // Redirect to login page after logout
    setIsSidebarOpen(false);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} userName={userName} onLogout={handleLogout} />

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="header">
          <button onClick={toggleSidebar} className="user-icon">
            <FaUserCircle size={40} />
          </button>
        </header>

        <div className="dashboard-content">
          <h1 className='welcome-Text'>Welcome to Smart Inverter Dashboard</h1>

          <div className="cards-container">
            <Link to="/voltage" className="card-link">
              <div className="card">
                <h3>Voltage</h3>
                <p>Current Voltage: 220V</p>
                <button className="card-btn">See more</button>
              </div>
            </Link>
            <Link to="/ampere" className="card-link">
              <div className="card">
                <h3>Ampere</h3>
                <p>Current Ampere: 5A</p>
                <button className="card-btn">See more</button>
              </div>
            </Link>
            <Link to="/battery" className="card-link">
              <div className="card">
                <h3>Battery</h3>
                <p>Battery Status: 80%</p>
                <button className="card-btn">See more</button>
              </div>
            </Link>
            <Link to="/status" className="card-link">
              <div className="card">
                <h3>Status</h3>
                <p>System Status: Running</p>
                <button className="card-btn">See more</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
