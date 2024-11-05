import React, { createContext, useState, useEffect } from "react";
import PropTypes from 'prop-types';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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