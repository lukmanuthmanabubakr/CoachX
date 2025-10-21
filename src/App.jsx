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
import PageLoader from "./components/PageLoader/PageLoader";
import UploadWelcomeImage from "./pages/UploadWelcomeImage/UploadWelcomeImage";
import CheckSignPage from "./components/CheckSignPage/CheckSignPage";
import Gender from "./components/Gender/Gender";
import FitnessGoal from "./pages/FitnessGoal/FitnessGoal";
import SignupCompleted from "./pages/SignupCompleted/SignupCompleted";
import Preferences from "./pages/Preferences/Preferences";
import Category from "./pages/Category/Category";
import SubscriptionPrice from "./pages/SubscriptionPrice/SubscriptionPrice";
import CheckGender from "./components/Protect/CheckGender";
import CheckFitnessGoal from "./components/Protect/CheckFitnessGoal";
import ProtectedRoute from "./components/Protect/ProtectedRoute";
import FollowTopMember from "./pages/FollowTopMember/FollowTopMember";

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  // ✅ Fetch current user on mount
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // ✅ Welcome screen animation
  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const hideTimer = setTimeout(() => setShowWelcome(false), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // ✅ Redirect based on login state (only after welcome finishes)
  // useEffect(() => {
  //   if (showWelcome || isLoading) return;

  //   if (user) {
  //     if (["/", "/home", "/signin", "/signup"].includes(location.pathname)) {
  //       navigate("/get-user", { replace: true });
  //     }
  //   } else {
  //     if (
  //       location.pathname.startsWith("/get-user") ||
  //       location.pathname.startsWith("/upload-welcome-image") ||
  //       location.pathname.startsWith("/subscription-price") ||
  //       location.pathname.startsWith("/creators-categories")
  //     ) {
  //       navigate("/home", { replace: true });
  //     }
  //   }
  // }, [user, isLoading, showWelcome, location.pathname, navigate]);

  // useEffect(() => {
  //   if (showWelcome || isLoading) return;

  //   // Check if user exists
  //   if (user) {
  //     const verified = user.isVerified || user.is_verified; // ✅ handles both naming styles

  //     // If user exists but not verified, always go to verification page
  //     if (!verified && location.pathname !== "/check-mail-verification") {
  //       navigate("/check-mail-verification", { replace: true });
  //       return;
  //     }

  //     // If user is verified and currently on any of the base routes, redirect to get-user
  //     if (
  //       verified &&
  //       [
  //         "/",
  //         "/home",
  //         "/signin",
  //         "/signup",
  //         "/check-mail-verification",
  //       ].includes(location.pathname)
  //     ) {
  //       navigate("/get-user", { replace: true });
  //     }
  //   } else {
  //     // If no user and on restricted route, send to home
  //     if (
  //       location.pathname.startsWith("/get-user") ||
  //       location.pathname.startsWith("/upload-welcome-image") ||
  //       location.pathname.startsWith("/subscription-price") ||
  //       location.pathname.startsWith("/creators-categories")
  //     ) {
  //       navigate("/home", { replace: true });
  //     }
  //   }
  // }, [user, isLoading, showWelcome, location.pathname, navigate]);

  useEffect(() => {
    if (showWelcome || isLoading) return;

    if (user) {
      const verified = user.isVerified || user.is_verified;

      // If the user is NOT verified
      if (!verified) {
        // 🟢 If they just SIGNED UP (came from /signup)
        if (
          location.pathname === "/signup" ||
          location.pathname === "/check-mail-verification"
        ) {
          navigate("/check-mail-verification", { replace: true });
        }
        // 🔵 If they SIGNED IN but email not verified → go to email-not-verified
        else if (
          location.pathname === "/signin" ||
          location.pathname === "/email-not-verified"
        ) {
          navigate("/email-not-verified", { replace: true });
        }
        // 🚫 Prevent them from accessing protected pages while unverified
        else if (
          location.pathname.startsWith("/get-user") ||
          location.pathname.startsWith("/upload-welcome-image") ||
          location.pathname.startsWith("/subscription-price") ||
          location.pathname.startsWith("/creators-categories")
        ) {
          navigate("/email-not-verified", { replace: true });
        }
        return;
      }

      // ✅ Verified user — redirect to dashboard if on base routes
      if (
        verified &&
        [
          "/",
          "/home",
          "/signin",
          "/signup",
          "/check-mail-verification",
          "/email-not-verified",
        ].includes(location.pathname)
      ) {
        navigate("/get-user", { replace: true });
      }
    } else {
      // ❌ Not logged in — block protected routes
      if (
        location.pathname.startsWith("/get-user") ||
        location.pathname.startsWith("/upload-welcome-image") ||
        location.pathname.startsWith("/subscription-price") ||
        location.pathname.startsWith("/creators-categories")
      ) {
        navigate("/home", { replace: true });
      }
    }
  }, [user, isLoading, showWelcome, location.pathname, navigate]);

  // ✅ Show welcome logo first on *every app load*
  if (showWelcome) {
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
        <Route element={<ProtectedRoute />}>
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
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/email-not-verified"
            element={
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <CheckSignPage />
              </motion.div>
            }
          />
        </Route>
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
        <Route element={<CheckGender />}>
          <Route element={<CheckFitnessGoal />}>
            <Route
              path="/get-user"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* <PageLoader /> */}
                  <GetUser />
                </motion.div>
              }
            />
          </Route>
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
        <Route element={<ProtectedRoute />}>
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
        </Route>
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
        <Route element={<CheckGender />}>
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
        </Route>

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
        <Route element={<CheckGender />}>
          <Route element={<CheckFitnessGoal />}>
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
          </Route>
        </Route>
        <Route element={<CheckGender />}>
          <Route element={<CheckFitnessGoal />}>
            <Route
              path="/select-coach"
              element={
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <FollowTopMember />
                </motion.div>
              }
            />
          </Route>
        </Route>
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
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
