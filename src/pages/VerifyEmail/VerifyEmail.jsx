import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, reset } from "../../redux/features/auth/authSlice";
import "./VerifyEmail.css";
import Loader from "../../components/Loader/Loader";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError } = useSelector((state) => state.auth);

  const handleVerify = () => {
    console.log("Verifying email with token:", verificationToken);

    if (!verificationToken) {
      console.log("No verification token found in URL.");
      return;
    }

    dispatch(verifyEmail(verificationToken));
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("Email verified successfully!");
      dispatch(reset());
      navigate("/signin");
    }

    if (isError) {
      console.log("Email verification failed!");
      dispatch(reset());
    }
  }, [isSuccess, isError, dispatch, navigate]);

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

        <button
          className={`verify-email-btn ${isLoading ? "loading" : ""}`}
          onClick={handleVerify}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Verify Email"}
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
