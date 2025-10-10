import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/onboard1.jpg";
import Img2 from "../../assets/onboard2.jpg";
import Img3 from "../../assets/onboard3.jpg";
import "./Home.css";

const slides = [
  {
    id: 1,
    image: Img1,
    title: "Work out anywhere with the help of CoachX",
    desc: "Your personalized fitness and growth journey starts here.",
  },
  {
    id: 2,
    image: Img2,
    title: "Track Your Progress",
    desc: "Easily monitor your milestones and achievements in one place.",
  },
  {
    id: 3,
    image: Img3,
    title: "Connect and Grow",
    desc: "Join our community of learners and coaches to level up faster.",
  },
];

const Home = () => {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (step < slides.length - 1) {
      const timer = setInterval(() => {
        triggerNext();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const triggerNext = () => {
    if (step < slides.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setAnimating(false);
      }, 700); // synced smooth duration
    }
  };

  const handleNext = () => {
    if (step === slides.length - 1) navigate("/onboard");
    else triggerNext();
  };

  const handleSkip = () => navigate("/onboard");

  return (
    <div className={`homeWrapper ${animating ? "slideOut" : "slideIn"}`}>
      <div className="homeContainer">
        <div className="onboardImage">
          <img src={slides[step].image} alt={slides[step].title} />
        </div>

        <div className="onboardContent">
          <div className="dotIndicator">
            {slides.map((_, i) => (
              <span key={i} className={i === step ? "dot active" : "dot"}></span>
            ))}
          </div>

          <h2>{slides[step].title}</h2>
          <p>{slides[step].desc}</p>

          <div className="onboardControls">
            <button className="skipBtn" onClick={handleSkip}>
              Skip
            </button>
            <button className="nextBtn" onClick={handleNext}>
              {step === slides.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
