import React, { createContext, useState, useEffect } from "react";
import { getCategoriesList } from "../services/CategoriesServices";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortValue, setSortValue] = useState("name_asc");

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getCategoriesList(sortValue);
        const data = response.data.items.$values;
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [sortValue]);

  // Add a new category to the current category list.
  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  // Update a category in the current category list.
  const editCategory = (updatedCategory) => {
    setCategories((prevCategories) =>
      prevCategories.map((c) =>
        c.id === updatedCategory.id ? { ...c, ...updatedCategory } : c
      )
    );
  };

  // Delete a category from the current category list by ID.
  const deleteCategoryById = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((c) => c.id !== id)
    );
  };

  return (
    <CategoriesContext.Provider
      value={{
        categories,
        isLoading,
        error,
        setSortValue,
        addCategory,
        editCategory,
        deleteCategoryById,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

