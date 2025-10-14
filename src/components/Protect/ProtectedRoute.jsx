import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // Check both Redux state and localStorage (in case of refresh)
  const isAuthenticated = user || localStorage.getItem("user");

  // ❌ Not logged in → Redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Logged in → Render the requested page
  return <Outlet />;
};

export default ProtectedRoute;
