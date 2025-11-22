import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  // Check if user is authenticated
  const authToken = localStorage.getItem("authToken");

  // If not authenticated, redirect to login page
  if (!authToken) {
    return <Navigate to="/register" replace />;
  }

  // If authenticated, render the protected route
  return <Outlet />;
};

export default ProtectedRoutes;
