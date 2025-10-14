import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiWeightLiftingUp, GiLotus } from "react-icons/gi";
import "./Category.css";

const Category = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  const handleNext = () => {
    if (selectedCategories.length === 0) return;
    navigate("/subscription-price"); // go to next page after selecting categories
  };

  return (
    <div className="category">
      <div className="category-container">
        <div className="category-card">
          <div className="step-indicator">Step 1 of 2</div>

          <h1>Choose your category</h1>
          <p className="category-sub">
            Select the categories you’re interested in to personalize your fitness plan.
          </p>

          <form className="category-options" onSubmit={(e) => e.preventDefault()}>
            <label
              className={`category-option ${
                selectedCategories.includes("strength training") ? "selected" : ""
              }`}
              onClick={() => toggleCategory("strength training")}
            >
              <div className="category-label-wrapper">
                <GiWeightLiftingUp className="category-icon" />
                <span className="category-label">Strength Training</span>
              </div>
              <span
                className={`category-radio ${
                  selectedCategories.includes("strength training") ? "checked" : ""
                }`}
              ></span>
            </label>

            <label
              className={`category-option ${
                selectedCategories.includes("yoga") ? "selected" : ""
              }`}
              onClick={() => toggleCategory("yoga")}
            >
              <div className="category-label-wrapper">
                <GiLotus className="category-icon" />
                <span className="category-label">Yoga</span>
              </div>
              <span
                className={`category-radio ${
                  selectedCategories.includes("yoga") ? "checked" : ""
                }`}
              ></span>
            </label>
          </form>

          <div className="category-actions">
            <button
              type="button"
              className={`next-btn ${
                selectedCategories.length === 0 ? "disabled" : ""
              }`}
              onClick={handleNext}
              disabled={selectedCategories.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
