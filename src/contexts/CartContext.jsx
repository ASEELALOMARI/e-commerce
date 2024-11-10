import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //get item form local storage
  const getItemFromLocalStorage = () => {
    const cartItems = localStorage.getItem("cart");
    return cartItems ? JSON.parse(cartItems) : [];
  };
  const [cartItem, setCartItem] = useState(getItemFromLocalStorage);

  //set item form local storage
  const setItemToLocalStorage = (cartItems) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  //add item to cart
  const addToCart = (product) => {
    setCartItem((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.productId === product.productId
      );

      let updatedCart;

      if (existingProductIndex >= 0) {
        // If the product already exists, update quantity
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
      } else {
        // Add new product to cart with quantity of 1
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      setItemToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  //remove item form cart
  const removeFromCart = (productId) => {
    setCartItem((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.productId !== productId
      );

      setItemToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  //updated quantity
  const updateQuantity = (productId, change) => {
    setCartItem((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      );

      setItemToLocalStorage(updatedCart);

      return updatedCart;
    });
  };

  //reset the cart
  const resetCart = () => {
    setCartItem([]);
    setItemToLocalStorage([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        updateQuantity,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
