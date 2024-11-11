import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/users`;

//Get All Users

export const getAllUsers = async (token, signal) => {
  const response = await axios.get(`${API_BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    signal: signal,
  });
  return response.data;
};

//Get User By ID
export const getUserByID = async (id, token) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// updated user data
export const updateUserProfile = async (id, token , data) =>{
  const response = await axios.put(`${API_BASE_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
}

export const DeleteUser = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
