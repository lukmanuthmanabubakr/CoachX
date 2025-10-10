import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home/Home";
import WelcomeLogo from "./components/WelcomeLogo/WelcomeLogo";
import Onboard from "./pages/Onboard/Onboard";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
      if (location.pathname !== "/onboard") {
        navigate("/", { replace: true });
      }
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [navigate, location.pathname]);

  if (showWelcome) return <WelcomeLogo fadeOut={fadeOut} />;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }} // start slightly below
              animate={{ opacity: 1, y: 0 }} // move to normal position
              exit={{ opacity: 0, y: -50 }} // exit upwards if leaving
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/onboard"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Onboard />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
