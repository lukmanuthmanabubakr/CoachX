import React, { useState, useEffect } from "react";
import "./ResetPass.css";
import logo from "../../assets/CoachX.svg";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, reset } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

const ResetPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Option 2: One line
  const { "reset-token": token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

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

    if (!isActive) {
      toast.error("Passwords must match and meet strength requirements.");
      return;
    }

    console.log("Reset password form submitted!");
    console.log("Token:", token);
    console.log("New password:", newPassword);

    const passwordData = {
      password: newPassword,
      passwordConfirm: confirmPassword, // <- include this
    };
    dispatch(resetPassword({ token, passwordData }));
  };

  useEffect(() => {
    if (isSuccess) {
      setNewPassword("");
      setConfirmPassword("");
      dispatch(reset());
      navigate("/signin"); // redirect to login after successful reset
    }

    if (isError) {
      console.error("Reset password error:", message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch, navigate]);

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
              required
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
              required
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
            disabled={!isActive || isLoading}
          >
            {isLoading ? <Loader /> : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
