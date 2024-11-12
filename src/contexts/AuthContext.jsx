import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

import UseCartContext from "../hooks/UseCartContext";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const { resetCart } = UseCartContext();
  
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn);
  const [isAdmin, setIsAdmin] = useState(storedIsAdmin);

  // Load user data and token from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setIsLoggedIn(storedIsLoggedIn);
      setIsAdmin(storedIsAdmin);
    }
  }, []);

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    setIsAdmin(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    resetCart();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn,
        isAdmin,
        setUser,
        setToken,
        setIsLoggedIn,
        setIsAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
