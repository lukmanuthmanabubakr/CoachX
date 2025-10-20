import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // 1️⃣ Check login
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ If all checks pass, render children routes
  return <Outlet />;
};

export default ProtectedRoute;
