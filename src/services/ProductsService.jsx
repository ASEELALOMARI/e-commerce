import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/products`;

export const getFilteredProduct = async (
  searchBy = "",
  page = 1,
  pageSize = 8,
  sortBy = ""
) => {
  const params = new URLSearchParams();

  if (searchBy) params.append("SearchBy", searchBy);
  if (page) params.append("Page", page);
  if (pageSize) params.append("PageSize", pageSize);
  if (sortBy) params.append("Sort", sortBy);

  const response = await axios.get(`${API_BASE_URL}?${params.toString()}`);
  return response.data;
};

export const fetchProductById = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/${productId}`);
  return response.data;
};
