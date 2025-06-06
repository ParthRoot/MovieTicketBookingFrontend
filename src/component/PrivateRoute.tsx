import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("authToken");

  if (!token || token === "") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
