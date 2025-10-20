import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, reset, getMe } from "../../redux/features/auth/authSlice";
import "./VerifyEmail.css";
import Loader from "../../components/Loader/Loader";

const VerifyEmail = () => {
  const { verificationToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError } = useSelector((state) => state.auth);

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
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser?.token) {
      // Fetch full user data after verification
      dispatch(getMe()).then((res) => {
        const fullUser = res.payload;

        if (fullUser && fullUser.role) {
          if (fullUser.role === "user") {
            navigate("/upload-welcome-image", { replace: true });
          } else if (fullUser.role === "creator") {
            navigate("/creators-categories", { replace: true });
          } else {
            console.warn("Unknown role:", fullUser.role);
          }
        } else {
          console.warn("No user role found even after getMe().");
        }

        dispatch(reset());
      });
    } else {
      console.warn("No token found in localStorage after verification.");
      dispatch(reset());
    }
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
