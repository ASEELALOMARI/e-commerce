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
          const data = response.data.items.$values;
          console.log(data);
          setProducts(data);
      } catch (error) {
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
