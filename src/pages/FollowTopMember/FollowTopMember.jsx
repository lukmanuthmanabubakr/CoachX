import React, { useState } from "react";
import "./FollowTopMember.css";
import coschImg from "../../assets/coach1.jpeg";

const FollowTopMember = () => {
  const [selectedCoaches, setSelectedCoaches] = useState([]);

  const coaches = [
    {
      id: 1,
      name: "Coach Aisha",
      clients: 120,
      rating: 5,
      image: coschImg,
    },
    {
      id: 2,
      name: "Coach Daniel",
      clients: 95,
      rating: 4,
      image: coschImg,
    },
    {
      id: 3,
      name: "Coach Liam",
      clients: 60,
      rating: 3,
      image: coschImg,
    },
    {
      id: 4,
      name: "Coach Emma",
      clients: 130,
      rating: 5,
      image: coschImg,
    },
    {
      id: 5,
      name: "Coach Sophia",
      clients: 80,
      rating: 4,
      image: coschImg,
    },
    {
      id: 6,
      name: "Coach Jacob",
      clients: 150,
      rating: 5,
      image: coschImg,
    },
    {
      id: 7,
      name: "Coach Noah",
      clients: 110,
      rating: 4,
      image: coschImg,
    },
    {
      id: 8,
      name: "Coach Grace",
      clients: 90,
      rating: 5,
      image: coschImg,
    },
  ];

  const toggleFollow = (id) => {
    setSelectedCoaches((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="selectCoach-container">
      <div className="selectCoach-card">
        <div className="step-indicator">Step 6 of 6</div>

        <h1>Select Your Coach</h1>
        <p className="selectCoach-sub">
          Choose one or more coaches to follow and get guidance.
        </p>

        <div className="coach-list">
          {coaches.map((coach) => (
            <div className="coach-item" key={coach.id}>
              <img src={coach.image} alt={coach.name} className="coach-img" />

              <div className="coach-info">
                <h3>{coach.name}</h3>
                <p className="coach-clients">{coach.clients} clients</p>
                <div className="coach-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`star ${i < coach.rating ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <button
                className={`follow-btn ${
                  selectedCoaches.includes(coach.id) ? "selected" : ""
                }`}
                onClick={() => toggleFollow(coach.id)}
              >
                {selectedCoaches.includes(coach.id) ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>

        <div className="bottom-buttons">
          <button className="back-btn">Back</button>
          <button
            className="finish-btn"
            disabled={selectedCoaches.length === 0}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default FollowTopMember;
