import axios from "axios";

const API_BASE_URL = "http://localhost:5125/api/v1/products";

export const getAllProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getFilteredProduct= async (searchBy,page, pageSize) => {

  const response = await axios.get(`${API_BASE_URL}?SearchBy=${searchBy}&`);
  return response.data;
};

export const fetchProductById = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/${productId}`);
  return response.data;
};
