import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/UseAuth";

const AdminProtectedRoute = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/not-authorized" />;
};

export default AdminProtectedRoute;
