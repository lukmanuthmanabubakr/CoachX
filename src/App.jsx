import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home/Home";
import WelcomeLogo from "./components/WelcomeLogo/WelcomeLogo";
import Onboard from "./pages/Onboard/Onboard";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import CheckMailVer from "./pages/CheckMailVer/CheckMailVer";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import ResetPass from "./pages/ResetPass/ResetPass";
import UploadWelcomeImage from "./pages/UploadWelcomeImage/UploadWelcomeImage";
import Gender from "./components/Gender/Gender";
import FitnessGoal from "./pages/FitnessGoal/FitnessGoal";
import SignupCompleted from "./pages/SignupCompleted/SignupCompleted";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import Preferences from "./pages/Preferences/Preferences";
import Category from "./pages/Category/Category";
import SubscriptionPrice from "./pages/SubscriptionPrice/SubscriptionPrice";
import GetUser from "./pages/GetUser/GetUser";
import ProtectedRoute from "./components/Protect/ProtectedRoute";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return; // exit if not home

    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    const hideTimer = setTimeout(() => {
      setShowWelcome(false);
      navigate("/", { replace: true }); // only redirect from /
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [navigate, location.pathname]);

  if (location.pathname === "/" && showWelcome) {
    return <WelcomeLogo fadeOut={fadeOut} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
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
        <Route
          path="/signup"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <SignUp />
            </motion.div>
          }
        />
        <Route
          path="/signin"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <SignIn />
            </motion.div>
          }
        />
        <Route
          path="/check-mail-verification"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <CheckMailVer />
            </motion.div>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <ForgetPass />
            </motion.div>
          }
        />
        <Route
          path="/reset-password/:reset-token"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <ResetPass />
            </motion.div>
          }
        />
        <Route
          path="/upload-welcome-image"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <UploadWelcomeImage />
            </motion.div>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/select-gender"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Gender />
              </motion.div>
            }
          />
        </Route>
        <Route
          path="/fitness-goal"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <FitnessGoal />
            </motion.div>
          }
        />
        <Route
          path="/signup-completed"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <SignupCompleted />
            </motion.div>
          }
        />
        <Route
          path="/verify-email/:verificationToken"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <VerifyEmail />
            </motion.div>
          }
        />
        <Route
          path="/choose-preferences"
          element={
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Preferences />
            </motion.div>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/creators-categories"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Category />
              </motion.div>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/subscription-price"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <SubscriptionPrice />
              </motion.div>
            }
          />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/get-user"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <GetUser />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default App;
