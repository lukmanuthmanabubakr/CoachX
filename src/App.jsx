import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import WelcomeLogo from "./components/WelcomeLogo/WelcomeLogo";
import Onboard from "./pages/Onboard/Onboard";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);

    const navigateTimer = setTimeout(() => {
      setShowWelcome(false);
      navigate("/");
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  // ⛔️ Render ONLY the WelcomeLogo if it's showing
  if (showWelcome) {
    return <WelcomeLogo fadeOut={fadeOut} />;
  }

  // ✅ After it hides, render your routes
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboard" element={<Onboard />} />
    </Routes>
  );
};

export default App;
