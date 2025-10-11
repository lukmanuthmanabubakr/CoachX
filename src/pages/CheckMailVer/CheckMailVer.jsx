import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./checkMailVer.css";
import logo from "../../assets/CoachX.svg";

const CheckMailVer = () => {
  const handleResend = () => {
    console.log("Resend verification email");
  };

  return (
    <motion.div
      className="checkmailver-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="checkmailver-card">
        <img src={logo} alt="Logo" className="checkmailver-logo" />

        <h2>Check Your Email</h2>
        <p>
          We’ve sent a verification link to your email address.
          Please verify your account to continue.
        </p>

        <button className="resend-btn" onClick={handleResend}>
          Resend Verification Email
        </button>

        <p className="signin-back">
          Already verified?{" "}
          <Link to="/signin" className="signin-back-link">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default CheckMailVer;
