import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadWelcomeImage.css";
import defaultAvatar from "../../assets/avatar.png";

const UploadWelcomeImage = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const currentStep = 1;
  const totalSteps = 5;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleNext = () => {
    // Smoothly navigate to Step 2 (Gender)
    navigate("/select-gender");
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        {/* Step Tracker */}
        <div className="upload-top">
          <div className="step-indicator">
            Step {currentStep} of {totalSteps}
          </div>
          <h1>Welcome</h1>
          <p>Add your profile picture so others can see you</p>

          <div className="avatar-wrapper">
            <label htmlFor="avatar-upload">
              <img
                src={image || defaultAvatar}
                alt="Profile Avatar"
                className="avatar-image"
              />
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="upload-bottom">
          <button
            className={`upload-btn ${!image ? "disabled" : ""}`}
            onClick={handleNext}
            disabled={!image}
          >
            Upload
          </button>
          <p className="skip-text" onClick={handleNext}>
            Skip for now
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadWelcomeImage;
