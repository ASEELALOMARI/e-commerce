import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/users`;

// Register function
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

// Login function
export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_BASE_URL}/login`, loginData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
