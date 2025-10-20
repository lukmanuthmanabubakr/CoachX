import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiFruitBowl, GiLotus } from "react-icons/gi"; // icons for nutrition & yoga
import "./Preferences.css";

const Preferences = () => {
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const togglePreference = (pref) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref)
        ? prev.filter((item) => item !== pref)
        : [...prev, pref]
    );
  };

  const handleNext = () => {
    if (selectedPreferences.length === 0) return;
    navigate("/complete"); // next route after selecting preferences
  };

  const handleBack = () => {
    navigate("/fitness-goal"); // go back to previous page
  };

  return (
    <div className="preferences">
      <div className="preferences-container">
        <div className="preferences-card">
          <div className="step-indicator">Step 4 of 5</div>

          <h1>Choose your preferences</h1>
          <p className="preferences-sub">
            Select what you’d like to focus on to personalize your experience.
          </p>

          <form className="preferences-options" onSubmit={(e) => e.preventDefault()}>
            <label
              className={`preferences-option ${
                selectedPreferences.includes("nutrition") ? "selected" : ""
              }`}
              onClick={() => togglePreference("nutrition")}
            >
              <div className="preferences-label-wrapper">
                <GiFruitBowl className="preferences-icon" />
                <span className="preferences-label">Nutrition</span>
              </div>
              <span
                className={`preferences-radio ${
                  selectedPreferences.includes("nutrition") ? "checked" : ""
                }`}
              ></span>
            </label>

            <label
              className={`preferences-option ${
                selectedPreferences.includes("yoga") ? "selected" : ""
              }`}
              onClick={() => togglePreference("yoga")}
            >
              <div className="preferences-label-wrapper">
                <GiLotus className="preferences-icon" />
                <span className="preferences-label">Yoga</span>
              </div>
              <span
                className={`preferences-radio ${
                  selectedPreferences.includes("yoga") ? "checked" : ""
                }`}
              ></span>
            </label>
          </form>

          <div className="preferences-actions">
            <button type="button" className="back-text" onClick={handleBack}>
              Back
            </button>

            <button
              type="button"
              className={`next-btn ${
                selectedPreferences.length === 0 ? "disabled" : ""
              }`}
              onClick={handleNext}
              disabled={selectedPreferences.length === 0}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
