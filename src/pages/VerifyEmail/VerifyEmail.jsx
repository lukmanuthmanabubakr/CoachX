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
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const { user, isLoading, isSuccess, isError } = useSelector(
    (state) => state.auth
  );


  const handleVerify = async () => {
    if (!verificationToken) return;

    setButtonLoading(true);
    try {
      await dispatch(verifyEmail(verificationToken)).unwrap();
    } catch (err) {
      console.error("Verification failed:", err);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess && user?.is_verified) {
      console.log("✅ Email verified successfully!");

      // Redirect based on role
      if (user.role === "user") {
        navigate("/upload-welcome-image", { replace: true });
      } else if (user.role === "creator") {
        navigate("/creators-categories", { replace: true });
      } else {
        console.warn("Unknown role:", user.role);
      }

      dispatch(reset());
    }

    if (isError) {
      console.log("❌ Email verification failed!");
      dispatch(reset());
    }
  }, [isSuccess, isError, user, navigate, dispatch]);

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
          className={`verify-email-btn ${buttonLoading ? "loading" : ""}`}
          onClick={handleVerify}
          disabled={buttonLoading}
        >
          {buttonLoading ? <Loader /> : "Verify Email"}
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
