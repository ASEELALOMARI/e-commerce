import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
import { getAllProducts } from "../services/ProductsService";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
          const response = await getAllProducts();
          const data = response.data;
          console.log(data);
          setProducts(data);
      } catch (error) {
          console.error(error);
          setError(error.message);
      } finally {
          setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductsContext.Provider>
  )
}
