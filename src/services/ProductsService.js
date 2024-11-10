import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL}/products`;

export const getFilteredProduct = async (
  searchBy = "",
  page = 1,
  pageSize = 8,
  sortBy = "",
  signal
) => {
  const params = new URLSearchParams();

  if (searchBy) params.append("SearchBy", searchBy);
  if (page) params.append("Page", page);
  if (pageSize) params.append("PageSize", pageSize);
  if (sortBy) params.append("Sort", sortBy);

  const response = await axios.get(`${API_BASE_URL}?${params.toString()}`, {
    signal,
  });
  return response.data;
};

export const fetchProductById = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/${productId}`);
  return response.data;
};

export const createNewProduct = async (productData, token) => {
  const response = await axios.post(`${API_BASE_URL}`, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateProduct = async (productId, productData, token) => {
  const response = await axios.put(
    `${API_BASE_URL}/${productId}`,
    productData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const DeleteProduct = async (id, token) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getProductComments = async (productId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_API_URL}/reviews/product/${productId}`
  );
  return response.data;
};
