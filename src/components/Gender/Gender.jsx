import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaMars, FaVenus } from "react-icons/fa";
import { updateMe } from "../../redux/features/auth/authSlice";
import "./Gender.css";

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const handleNext = async () => {
    if (!selectedGender) return;

    // Dispatch updateMe action
    await dispatch(updateMe({ gender: selectedGender }));

    // After successful update, navigate to next page
    navigate("/fitness-goal");
  };

  const handleBack = () => {
    navigate("/upload-welcome-image");
  };

  return (
    <div className="gender">
      <div className="gender-container">
        <div className="gender-card">
          <div className="step-indicator">Step 2 of 4</div>

          <h1>What’s your gender?</h1>
          <p className="gender-sub">
            Select the option that best describes you.
          </p>

          <form className="gender-options" onSubmit={(e) => e.preventDefault()}>
            <label
              className={`gender-option ${
                selectedGender === "male" ? "selected" : ""
              }`}
              htmlFor="gender-male"
            >
              <div className="gender-label-wrapper">
                <FaMars className="gender-icon" />
                <span className="gender-label">Male</span>
              </div>
              <input
                id="gender-male"
                className="gender-radio"
                type="radio"
                name="gender"
                value="male"
                checked={selectedGender === "male"}
                onChange={() => setSelectedGender("male")}
              />
            </label>

            <label
              className={`gender-option ${
                selectedGender === "female" ? "selected" : ""
              }`}
              htmlFor="gender-female"
            >
              <div className="gender-label-wrapper">
                <FaVenus className="gender-icon" />
                <span className="gender-label">Female</span>
              </div>
              <input
                id="gender-female"
                className="gender-radio"
                type="radio"
                name="gender"
                value="female"
                checked={selectedGender === "female"}
                onChange={() => setSelectedGender("female")}
              />
            </label>
          </form>

          <div className="gender-actions">
            <button type="button" className="back-text" onClick={handleBack}>
              Back
            </button>

            <button
              type="button"
              className={`next-btn ${isLoading ? "loading" : ""} ${
                !selectedGender ? "disabled" : ""
              }`}
              onClick={handleNext}
              disabled={!selectedGender || isLoading}
            >
              {isLoading ? (
                <div className="btn-loading">
                  <span className="btn-loader"></span>
                </div>
              ) : (
                "Next"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gender;
