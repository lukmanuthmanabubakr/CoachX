import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/CoachX.svg";
import "./ForgetPass.css";

const ForgetPass = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset link sent to:", email);
    // You’ll later connect this to your backend
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <img src={logo} alt="CoachX Logo" className="forgot-logo" />
        <h2>Forgot Password?</h2>
        <p className="forgot-desc">
          Enter your registered email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="forgot-form">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`forgot-btn ${email ? "active" : ""}`}
            disabled={!email}
          >
            Send Reset Link
          </button>
        </form>

        <div className="forgot-bottom-text">
          <p>
            Remember your password?{" "}
            <Link to="/signin" className="forgot-link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
