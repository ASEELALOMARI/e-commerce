import axios from "axios";

const API_BASE_URL = "http://localhost:5125/api/v1/products";

export const getAllProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
