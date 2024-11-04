import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../hooks/UseAuthContext";

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthContext();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
