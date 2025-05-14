import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Voltage from "./pages/Voltage";
import Battery from "./pages/Battery";
import Ampere from "./pages/Ampere";
import Status from "./pages/Status";
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/voltage" element={<Voltage />} />
        <Route path="/battery" element={<Battery />} />
        <Route path="/ampere" element={<Ampere />} />
        <Route path="/status" element={<Status />} />        
        <Route path="/profile" element={<Profile />} />        
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
