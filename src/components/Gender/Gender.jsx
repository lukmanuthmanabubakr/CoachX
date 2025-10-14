import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMars, FaVenus } from "react-icons/fa";
import "./Gender.css";

const Gender = () => {
  const [selectedGender, setSelectedGender] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedGender) return;
    navigate("/fitness-goal"); // next route
  };

  const handleBack = () => {
    navigate("/upload-welcome-image");
  };

  return (
    <div className="gender">
      <div className="gender-container">
        <div
          className="gender-card"
          role="region"
          aria-labelledby="gender-title"
        >
          <div className="step-indicator">Step 2 of 4</div>

          <h1 id="gender-title">What’s your gender?</h1>
          <p className="gender-sub">
            Select the option that best describes you.
          </p>

          <form className="gender-options" onSubmit={(e) => e.preventDefault()}>
            {/* Male */}
            <label
              className={`gender-option ${
                selectedGender === "male" ? "selected" : ""
              }`}
              htmlFor="gender-male"
            >
              <div className="gender-label-wrapper">
                <FaMars className="gender-icon" aria-hidden="true" />
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
                aria-label="Male"
              />
            </label>

            {/* Female */}
            <label
              className={`gender-option ${
                selectedGender === "female" ? "selected" : ""
              }`}
              htmlFor="gender-female"
            >
              <div className="gender-label-wrapper">
                <FaVenus className="gender-icon" aria-hidden="true" />
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
                aria-label="Female"
              />
            </label>
          </form>

          <div className="gender-actions">
            <button
              type="button"
              className="back-text"
              onClick={handleBack}
              aria-label="Back to previous step"
            >
              Back
            </button>

            <button
              type="button"
              className={`next-btn ${!selectedGender ? "disabled" : ""}`}
              onClick={handleNext}
              disabled={!selectedGender}
              aria-disabled={!selectedGender}
              aria-label="Next"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gender;
