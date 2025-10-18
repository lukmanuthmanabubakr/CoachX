import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // 🚨 If not authenticated
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ If authenticated and verified
  return <Outlet />;
};

export default ProtectedRoute;
