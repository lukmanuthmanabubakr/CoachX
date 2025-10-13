import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./Register.css";
import { FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../assets/Onboard.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, reset } from "../../redux/features/auth/authSlice";

const Register = ({ role, setStep }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [strength, setStrength] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 👇 these values come from Redux state
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // 👇 check result after action
  useEffect(() => {
    if (isSuccess && user) {
      console.log("✅ Signup successful:", user);
      navigate("/dashboard"); // or wherever you want after signup
    }
    if (isError) {
      console.log("❌ Signup failed:", message);
      setError(message);
    }
    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "password") checkStrength(value);
  };

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirm = () => setShowConfirm((prev) => !prev);

  const checkStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) setStrength("Weak");
    else if (score === 2 || score === 3) setStrength("Medium");
    else if (score >= 4) setStrength("Strong");
    else setStrength("");
  };

  const allFilled =
    form.name && form.email && form.password && form.confirmPassword;
  const isStrongPassword = strength === "Strong";
  const passwordsMatch =
    form.password &&
    form.confirmPassword &&
    form.password === form.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }
    setError("");

    if (allFilled && isStrongPassword && passwordsMatch) {
      const userData = {
        fullName: form.name,
        email: form.email,
        password: form.password,
        passwordConfirm: form.confirmPassword,
      };

      console.log("🟡 Sending signup request:", userData);
      dispatch(signup(userData));
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left Section */}
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

      {/* Right Section */}
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

            {/* Password */}
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePassword}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Password Strength */}
            <AnimatePresence mode="wait">
              {form.password && (
                <motion.div
                  key={strength}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`password-strength ${strength.toLowerCase()}`}
                >
                  Strength: <span>{strength}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Confirm Password */}
            <label className="cPass">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleConfirm}
                aria-label="Toggle confirm password visibility"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error if passwords don't match */}
            {error && <p className="error-text">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className={`register-btn ${
                allFilled && isStrongPassword && passwordsMatch ? "active" : ""
              }`}
              disabled={
                !allFilled || !isStrongPassword || !passwordsMatch || isLoading
              }
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
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
            <Link to="/signin" className="signup-link-text">
              Sign In
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
