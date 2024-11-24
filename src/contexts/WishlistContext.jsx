import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  userWishlists,
  addToWishlist,
  removeFromWishlist,
  resetWishlist,
} from "../services/WishlistServices";
import useAuthContext from "../hooks/UseAuthContext";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isLoggedIn, token, user } = useAuthContext();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist items and sync with local storage
  const fetchWishlistItems = async () => {
    if (!isLoggedIn) return;
    try {
      const userId = user.userId;
      const response = await userWishlists(token, userId);
      const fetchedItems = response.data.products.$values;
      setWishlistItems(fetchedItems);
      localStorage.setItem("wishlistItems", JSON.stringify(fetchedItems));
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  // Add a product to the wishlist
  const addProductToWishlist = async (product) => {
    try {
      const userId = user.userId;
      await addToWishlist(token, userId, product.productId);
      const updatedItems = [...wishlistItems, product];
      setWishlistItems(updatedItems);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  };

  // Remove a product from the wishlist
  const removeProductFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(token, productId);
      const updatedItems = wishlistItems.filter(
        (item) => item.productId !== productId
      );
      setWishlistItems(updatedItems);
      localStorage.setItem("wishlistItems", JSON.stringify(updatedItems));
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  // Reset the wishlist in both backend and local storage
  const resetWishlistForUser = async () => {
    try {
      const userId = user.userId;
      await resetWishlist(token, userId);
      setWishlistItems([]);
      localStorage.removeItem("wishlistItems");
    } catch (error) {
      console.error("Error resetting wishlist:", error);
    }
  };

  // Clear only local storage for logout
  const clearLocalWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem("wishlistItems");
  };

  // Check if a product is already in the wishlist
  const isProductInWishlist = (productId) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  // Toggle the wishlist for a product (add or remove)
  const toggleWishlist = async (product) => {
    if (isProductInWishlist(product.productId)) {
      await removeProductFromWishlist(product.productId);
    } else {
      await addProductToWishlist(product);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlistItems();
    }
  }, [isLoggedIn]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        fetchWishlistItems,
        addProductToWishlist,
        removeProductFromWishlist,
        resetWishlistForUser,
        clearLocalWishlist,
        isProductInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
