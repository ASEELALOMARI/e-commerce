import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
    const controller = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getFilteredProduct(
          searchValue,
          pageValue,
          pageSizeValue,
          sortValue,
          controller.signal,
        );
        const data = response.data.items.$values;
        setProducts(data);
        setTotalItems(response.data.totalItems);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Fetch canceled");
        } else {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    // Clean up function to cancel the request
    return () => controller.abort();
  }, [searchValue, pageValue, sortValue]);

  //Add new products to the current product list.
  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  //Update a product in the current product list.
  const editProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.productId === updatedProduct.productId ? { ...p, ...updatedProduct } : p
      )
    );
  };

  //Delete a product from the current product list.
  const deleteProductById = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p.productId !== id)
    );
  };

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
        addProduct,
        editProduct,
        deleteProductById,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
