import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./CheckSignPage.css";
import logo from "../../assets/CoachX.svg";

const CheckSignPage = () => {
  const handleGoToGmail = () => {
    // Open Gmail in a new tab
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <motion.div
      className="checkSignPage-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="checkSignPage-card">
        <img src={logo} alt="Logo" className="checkSignPage-logo" />

        <h2>Email Not Verified</h2>
        <p>
          Your account email has not been verified yet. Please check your inbox
          and click the verification link we sent earlier to activate your account.
        </p>

        <button className="resend-btn" onClick={handleGoToGmail}>
          Go to Gmail
        </button>

        <p className="signin-back">
          Already verified?{" "}
          <Link to="/signin" className="signin-back-link">
            Try signing in again
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default CheckSignPage;
