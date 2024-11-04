import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../hooks/UseAuthContext";

const AdminProtectedRoute = () => {
  const { isLoggedIn, isAdmin } = useAuthContext();
  return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default AdminProtectedRoute;
