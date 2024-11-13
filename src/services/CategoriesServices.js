import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/category`;

// Get all categories

export const getCategoriesList = async (sortBy = "", signal) => {
  const params = new URLSearchParams();
  if (sortBy) params.append("Sort", sortBy);

  const response = await axios.get(
    `${API_BASE_URL}/list?${params.toString()}`,
    { signal }
  );
  return response.data;
};

export const getCategoryByID = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createNewCategory = async (newCategory, token) => {
  const response = await axios.post(`${API_BASE_URL}`, newCategory, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateCategory = async (id, updatedCategory, token) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedCategory, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteCategory = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
