import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const CheckGender = () => {
  const { user } = useSelector((state) => state.auth);

  // 1️⃣ If not logged in → redirect to Sign In
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // 2️⃣ Apply gender check only if user.role === "user"
  if (user.role === "user" && !user.gender) {
    return <Navigate to="/select-gender" replace />;
  }

  // ✅ All good → allow access
  return <Outlet />;
};

export default CheckGender;
