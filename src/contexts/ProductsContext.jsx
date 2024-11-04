import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
import PropTypes from "prop-types";
import { getFilteredProduct } from "../services/ProductsService";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [pageSizeValue] = useState(8);
  const [sortValue, setSortValue] = useState("name_asc");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getFilteredProduct(
          searchValue,
          pageValue,
          pageSizeValue,
          sortValue
        );
        const data = response.data.items.$values;
        setProducts(data);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchValue, pageValue, sortValue]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoading,
        error,
        totalItems,
        searchValue,
        setSearchValue,
        pageValue,
        setPageValue,
        sortValue,
        setSortValue,
        pageSizeValue,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
