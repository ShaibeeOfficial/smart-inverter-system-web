// src/Login.js
import React, { useState } from "react";
import "./Login.css"; // Importing styles
import logo from "./assets/your-logo.png"; // Replace with your logo path
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import Firebase auth
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/welcome");
    } catch (error) {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img src={logo} alt="Smart Inverter Logo" />
      </div>

      <div className="right-section">
        <div className="login-box">
          <h2>Welcome</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="forgot-btn">Forgot Password?</button>
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
