import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
import { fetchProductById, getAllProducts, getFilteredProduct } from "../services/ProductsService";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAllProducts();
        console.log(response);
        const data = response.data.items.$values;
        setProducts(data);
        setTotalItems(response.data.totalItems);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchProductById(id);
      return response.data;
      
    } catch (error) {
      setError(error.message);

    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredData = async (search, page, pageSize, SortBy) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getFilteredProduct(search,page, pageSize, SortBy);
      const FiletedData = response.data.items.$values;
      setProducts(FiletedData);
      setTotalItems(response.data.totalItems);
      
    } catch (error) {
      setError(error.message);

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductsContext.Provider value={{ products, isLoading, error,totalItems, getProductById, getFilteredData}}>
      {children}
    </ProductsContext.Provider>
  );
};
