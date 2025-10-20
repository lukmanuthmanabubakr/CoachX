import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckFitnessGoal = () => {
  const { user } = useSelector((state) => state.auth);

  // 1️⃣ If not logged in → redirect to Sign In
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 2️⃣ Apply fitness goal check only if user.role === "user"
  if (user.role === "user" && (!user.fitnessGoal || user.fitnessGoal.length === 0)) {
    return <Navigate to="/fitness-goal" replace />;
  }

  // ✅ All good → allow access
  return <Outlet />;
};

export default CheckFitnessGoal;
