import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SubscriptionPrice.css";

const SubscriptionPrice = () => {
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!price) return;
    console.log("Creator set subscription price:", price);
    // 👉 Here you can send the price to your backend API to save it
    // e.g. await axios.post("/api/creator/price", { price });
    navigate("/creator-dashboard"); // redirect after saving
  };

  const handleBack = () => {
    navigate("/creators-categories");
  };

  return (
    <div className="creator-price">
      <div className="creator-price-container">
        <div className="creator-price-card">
          <div className="step-indicator">Step 2 of 2</div>

          <h1>Set Your Subscription Price</h1>
          <p className="price-sub">
            Enter the price subscribers will pay to access your service.
          </p>

          <div className="price-input">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              placeholder="e.g. 25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="per-month">/month</span>
          </div>

          <div className="price-actions">
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button
              className={`save-btn ${!price ? "disabled" : ""}`}
              onClick={handleSave}
              disabled={!price}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPrice;
