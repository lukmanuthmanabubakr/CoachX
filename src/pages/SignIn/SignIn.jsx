import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import loginImg from "../../assets/onboardPage.jpg"; // 👈 update to your image path

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allFilled = form.email && form.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allFilled) {
      console.log("Logging in:", form);
      // your login logic
    }
  };

  return (
    <div className="signin-container">
      {/* Left Side */}
      <div className="signin-left">
        <img src={loginImg} alt="Sign in visual" className="signin-image" />
        <h2>The best platform to connect, create, and grow.</h2>
      </div>

      {/* Right Side */}
      <div className="signin-right">
        <div className="signin-card">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>

          <h2 className="signin-heading">Welcome Back</h2>
          <p className="signin-subtext">Sign in to continue your journey</p>

          <form onSubmit={handleSubmit} className="signin-form">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className={`signin-btn ${allFilled ? "active" : ""}`}
              disabled={!allFilled}
            >
              Sign In
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn">
            <FcGoogle className="google-icon" />
            Continue with Google
          </button>

          <p className="signin-link">
            Don’t have an account?{" "}
            <a href="/signup" className="signin-link-text">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
