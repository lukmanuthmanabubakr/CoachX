import React, { useState } from "react";
import "./ResetPass.css";
import logo from "../../assets/CoachX.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return "";
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const mediumRegex = /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,})$/;

    if (strongRegex.test(password)) return "Strong";
    if (mediumRegex.test(password)) return "Medium";
    return "Weak";
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const isActive =
    newPassword && confirmPassword && newPassword === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isActive) {
      alert("Password reset successful!");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <img src={logo} alt="CoachX Logo" className="reset-logo" />
        <h2>Reset Your Password</h2>
        <p className="reset-desc">
          Create a strong new password to secure your account.
        </p>

        <form onSubmit={handleSubmit} className="reset-form">
          <label htmlFor="new-password">New Password</label>
          <div className="reset-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <span
              className="reset-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          {/* Password strength indicator */}
          {newPassword && (
            <p
              className={`password-strength show ${passwordStrength.toLowerCase()}`}
            >
              Strength: {passwordStrength}
            </p>
          )}
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="reset-input-wrapper">
            <input
              type={showConfirm ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <span
              className="reset-icon"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className={`reset-btn ${isActive ? "active" : ""}`}
            disabled={!isActive}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
