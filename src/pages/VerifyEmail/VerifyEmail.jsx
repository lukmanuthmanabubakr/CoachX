import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const { verificationToken } = useParams();

  return (
    <div className="verify-email-container">
      <motion.div
        className="verify-email-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="verify-email-title">Verify Your Email</h1>
        <p className="verify-email-text">
          Please click the button below to verify your account.
        </p>
        <button className="verify-email-btn">
          Verify Email
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
