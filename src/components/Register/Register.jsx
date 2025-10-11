import React, { useState } from "react";
import { motion } from "framer-motion"; // 👈 import motion
import "./register.css";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/Onboard.svg";

const Register = ({ role, setStep }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allFilled = form.name && form.email && form.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allFilled) {
      console.log("Registering user:", { ...form, role });
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: 40 }}      // 👈 fade + slide up
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}  // 👈 smooth timing
    >
      {/* Left Info Section */}
      <div className="register-left">
        <motion.div
          className="register-left-content"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img src={logo} alt="Logo" className="register-left-logo" />
          <h2>Create an Account</h2>
          <p>
            Join our platform as a{" "}
            <strong>{role === "creator" ? "Creator" : "Subscriber"}</strong> and
            get started today.
          </p>
        </motion.div>
      </div>

      {/* Right Form Section */}
      <motion.div
        className="register-right"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div
          className="register-card"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button className="back-btn" onClick={() => setStep(1)}>
            <FaArrowLeft />
          </button>

          <form onSubmit={handleSubmit} className="register-form">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
            />

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
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className={`register-btn ${allFilled ? "active" : ""}`}
              disabled={!allFilled}
            >
              Sign Up
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-btn">
            <FcGoogle className="google-icon" />
            Continue with Google
          </button>

          <p className="signup-link">
            Already have an account?{" "}
            <a href="/signin" className="signup-link-text">
              Sign In
            </a>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
