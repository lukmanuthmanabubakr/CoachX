import React, { useState, useEffect } from "react";
import {
  Route,
  Routes,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux"; // ✅ NEW
import { getMe } from "./redux/features/auth/authSlice"; // ✅ NEW

import Home from "./pages/Home/Home";
import WelcomeLogo from "./components/WelcomeLogo/WelcomeLogo";
import Onboard from "./pages/Onboard/Onboard";
import SignUp from "./pages/SignUp/SignUp";
import CheckMailVer from "./pages/CheckMailVer/CheckMailVer";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import GetUser from "./pages/GetUser/GetUser";
import SignIn from "./pages/SignIn/SignIn";
import ForgetPass from "./pages/ForgetPass/ForgetPass";
import ResetPass from "./pages/ResetPass/ResetPass";
import ProtectedRoute from "./components/Protect/ProtectedRoute";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isVerified } = useSelector((state) => state.auth); // ✅ NEW

  // Load current user on app mount
  useEffect(() => {
    if (location.pathname === "/") {
      const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
      const hideTimer = setTimeout(() => setShowWelcome(false), 3500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setShowWelcome(false);
    }
  }, [location.pathname]);

  if (location.pathname === "/" && showWelcome) {
    return <WelcomeLogo fadeOut={fadeOut} />;
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            showWelcome ? (
              <WelcomeLogo fadeOut={fadeOut} />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/home"
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
      </Routes>
    </AnimatePresence>
  );
};

export default App;
