import React, { useState } from "react";
import "./UploadWelcomeImage.css";
import defaultAvatar from "../../assets/avatar.png";

const UploadWelcomeImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        {/* 🔼 Top Section */}
        <div className="upload-top">
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

        {/* 🔽 Bottom Section */}
        <div className="upload-bottom">
          <button
            className={`upload-btn ${!image ? "disabled" : ""}`}
            disabled={!image}
          >
            Upload
          </button>
          <p className="skip-text">Skip for now</p>
        </div>
      </div>
    </div>
  );
};

export default UploadWelcomeImage;
