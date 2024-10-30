import React, { createContext, useState, useEffect, useContext } from "react";
import { registerUser, loginUser } from "../services/AuthServices";

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [AuthError, setError] = useState("");
  const [AuthSuccess, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // Register function
  const register = async (userData) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await registerUser(userData);
      if (response.statusCode == "201") {
        const successMessage =
          response.message != null
            ? response.message
            : "user register successfully";
        setSuccess(successMessage);
        return true;
      }
    } catch (err) {
      console.log(err.message);
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      setError(null);
      const loginData = {
        Email: email,
        Password: password,
      };
      const response = await loginUser(loginData);

      if (response.statusCode == "200") {
        const { token, username, userId, isAdmin } = response.data;
        // Set state and localStorage
        const userInfo = { username, userId };
        setUser(userInfo);
        setToken(token);
        setIsLoggedIn(true);
        setIsAdmin(isAdmin);
        const successMessage =
          response.message != null ? response.message : "login success";
        setSuccess(successMessage);

        localStorage.setItem("user", JSON.stringify(userInfo));
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");

        return true;
        //return successMessage;
      }
    } catch (err) {
      setSuccess(null);
      const errorMessage = err.message != null ? err.message : "Try again";
      setError(errorMessage);
      //return errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

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
        AuthError,
        AuthSuccess,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
