import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiRunningShoe, GiMuscleUp, GiWeightLiftingUp } from "react-icons/gi";
import "./FitnessGoal.css";

const FitnessGoal = () => {
  const navigate = useNavigate();
  const [selectedGoals, setSelectedGoals] = useState([]);

  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((item) => item !== goal)
        : [...prev, goal]
    );
  };

  const handleNext = () => {
    if (selectedGoals.length === 0) return;
    navigate("/activity-level"); // next route
  };

  const handleBack = () => {
    navigate("/select-gender");
  };

  return (
    <div className="fitness-goal">
      <div className="fitness-container">
        <div className="fitness-card">
          <div className="step-indicator">Step 3 of 6</div>

          <h1>What’s your fitness goal?</h1>
          <p className="fitness-sub">
            Choose one or more fitness goals that match your target.
          </p>

          <form className="fitness-options" onSubmit={(e) => e.preventDefault()}>
            <label
              className={`fitness-option ${
                selectedGoals.includes("weight loss") ? "selected" : ""
              }`}
              onClick={() => toggleGoal("weight loss")}
            >
              <div className="fitness-label-wrapper">
                <GiRunningShoe className="fitness-icon" />
                <span className="fitness-label">Weight Loss</span>
              </div>
              <span
                className={`fitness-radio ${
                  selectedGoals.includes("weight loss") ? "checked" : ""
                }`}
              ></span>
            </label>

            <label
              className={`fitness-option ${
                selectedGoals.includes("muscle gain") ? "selected" : ""
              }`}
              onClick={() => toggleGoal("muscle gain")}
            >
              <div className="fitness-label-wrapper">
                <GiMuscleUp className="fitness-icon" />
                <span className="fitness-label">Muscle Gain</span>
              </div>
              <span
                className={`fitness-radio ${
                  selectedGoals.includes("muscle gain") ? "checked" : ""
                }`}
              ></span>
            </label>

            <label
              className={`fitness-option ${
                selectedGoals.includes("keep fit") ? "selected" : ""
              }`}
              onClick={() => toggleGoal("keep fit")}
            >
              <div className="fitness-label-wrapper">
                <GiWeightLiftingUp className="fitness-icon" />
                <span className="fitness-label">Keep Fit</span>
              </div>
              <span
                className={`fitness-radio ${
                  selectedGoals.includes("keep fit") ? "checked" : ""
                }`}
              ></span>
            </label>
          </form>

          <div className="fitness-actions">
            <button type="button" className="back-text" onClick={handleBack}>
              Back
            </button>

            <button
              type="button"
              className={`next-btn ${
                selectedGoals.length === 0 ? "disabled" : ""
              }`}
              onClick={handleNext}
              disabled={selectedGoals.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessGoal;
