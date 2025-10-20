import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignIn.css";
import logo from "../../assets/Onboard.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/features/auth/authSlice";
import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isVerified, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const allFilled = form.email && form.password;

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (allFilled) {
      dispatch(login(form));
    }
  };

  useEffect(() => {
    if (isSuccess && user) {
      navigate("/get-user");
    }

    if (isError) {
      setErrorMessage(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, user, message, dispatch, navigate]);


  return (
    <motion.div
      className="signin-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* LEFT — IMAGE SECTION */}
      <div className="signin-left">
        <div className="signin-overlay"></div>
        <motion.div
          className="signin-left-content"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <img src={logo} alt="CoachX Logo" className="signin-logo" />
          <h2>Welcome Back</h2>
          <p>Sign in to continue your journey on our platform.</p>
        </motion.div>
      </div>

      {/* RIGHT — FORM SECTION */}
      <motion.div
        className="signin-right"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div
          className="signin-card"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
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
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className={`signin-btn ${allFilled ? "active" : ""}`}
              disabled={!allFilled || isLoading}
            >
              {isLoading ? <Loader /> : "Sign In"}
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
            <Link to="/signup" className="signin-link-text">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;
