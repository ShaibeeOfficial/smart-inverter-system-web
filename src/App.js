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
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/voltage"
          element={
            <ProtectedRoute>
              <Voltage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ampere"
          element={
            <ProtectedRoute>
              <Ampere />
            </ProtectedRoute>
          }
        />

        <Route
          path="/battery"
          element={
            <ProtectedRoute>
              <Battery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
