import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../../assets/GymSet1.svg";
import Img2 from "../../assets/GymSet22.svg";
import Img3 from "../../assets/GymSet3.svg";
import "./Home.css";

const slides = [
  {
    id: 1,
    image: Img1,
    title: "Get coached by the best trainers in the world.",
    desc: "Unlock access to world-class fitness creators, personalized routines, and nutrition insights designed to help you reach your peak.",
  },
  {
    id: 2,
    image: Img2,
    title: "Power your passion. Inspire the world.",
    desc: "CoachX connects elite creators and everyday athletes. Share your journey, build your brand, and get rewarded for every rep.",
  },
  {
    id: 3,
    image: Img3,
    title: "AI that understands your goals.",
    desc: "Scan your meals, track your progress, and get real-time recommendations built around your unique fitness journey.",
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
