import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/orders`;

// post new order

export const sendNewOrder = async (token, orderData) => {
  const response = await axios.post(`${API_BASE_URL}`, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
