import React, { useEffect, useState } from "react";
import { Badge, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import UseCartContext from "../../hooks/UseCartContext";

function CartNavBar() {
  const navigate = useNavigate();
  const { cartItem } = UseCartContext();
  const [cartTotalItems, setCartTotalItems] = useState(0);

  useEffect(() => {
    // Calculate total quantity in the cart
    const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);
    setCartTotalItems(totalItems);
  }, [cartItem]);

  const handelOpenCart = () => {
    navigate("Shopping-cart");
  };

  return (
    <IconButton color="inherit" onClick={handelOpenCart}>
      <Badge badgeContent={cartTotalItems} color="secondary">
        <ShoppingCart sx={{ color: "var(--primary-main)" }} />
      </Badge>
    </IconButton>
  );
}

export default CartNavBar;
