import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, reset } from "../../redux/features/auth/authSlice";
import logo from "../../assets/CoachX.svg";
import "./ForgetPass.css";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const ForgetPass = () => {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  // 🟢 Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    const emailData = { email };

    console.log("📤 Dispatching forgotPassword with:", emailData);
    dispatch(forgotPassword(emailData));
  };

  // 🟣 Handle Redux state updates
  useEffect(() => {
    if (isSuccess) {
      console.log("✅ Password reset link sent successfully!");
      setEmail("");
      dispatch(reset());
    }

    if (isError) {
      console.error("❌ Forgot password error:", message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch]);

  // 🟡 Log when loading state changes
  useEffect(() => {
    if (isLoading) console.log("⏳ Sending password reset request...");
  }, [isLoading]);

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <img src={logo} alt="CoachX Logo" className="forgot-logo" />
        <h2>Forgot Password?</h2>
        <p className="forgot-desc">
          Enter your registered email address and we’ll send you a link to reset
          your password.
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
            disabled={!email || isLoading}
          >
            {isLoading ? <Loader /> : "Send Reset Link"}
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
