import React from "react";
import { IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";

function CartNavBar() {
  return (
    <IconButton color="inherit">
      <ShoppingCart sx={{ color:  'var(--primary-main)' }} />
    </IconButton>
  );
}

export default CartNavBar;
