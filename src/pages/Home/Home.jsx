import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/testingOne.jpeg";
import Img2 from "../../assets/testingtwo.jpeg";
import Img3 from "../../assets/testingthree.jpeg";
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
  const [firstLoad, setFirstLoad] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false); // 🆕
  const navigate = useNavigate();
  const timerRef = useRef(null);

  // ✅ Preload all slide images
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (imageLoaded && step < slides.length - 1) {
      timerRef.current = setInterval(triggerNext, 5000);
    }
    return () => clearInterval(timerRef.current);
  }, [step, imageLoaded]);

  const triggerNext = () => {
    if (step < slides.length - 1) {
      setAnimating(true);
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setAnimating(false);
      }, 700);
    }
  };

  const handleNext = () => {
    clearInterval(timerRef.current);
    if (step === slides.length - 1) {
      navigate("/onboard", { replace: true });
    } else {
      triggerNext();
    }
  };

  const handleSkip = () => {
    clearInterval(timerRef.current);
    navigate("/onboard", { replace: true });
  };

  // ✅ Disable animation until first image has loaded
  const handleImageLoad = () => {
    setImageLoaded(true);
    setTimeout(() => setFirstLoad(false), 400); // smooth entry
  };

  return (
    <div
      className={`homeWrapper ${
        firstLoad ? "" : animating ? "slideOut" : "slideIn"
      }`}
    >
      <div className="homeContainer">
        <div className="onboardImage">
          <img
            src={slides[step].image}
            alt={slides[step].title}
            onLoad={handleImageLoad} // 🆕 detect when first image is ready
            className={imageLoaded ? "fade-in" : "hidden"}
          />
        </div>

        <div className="onboardContent">
          <div className="dotIndicator">
            {slides.map((_, i) => (
              <span
                key={i}
                className={i === step ? "dot active" : "dot"}
              ></span>
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
