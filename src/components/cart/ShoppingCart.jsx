import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import { Delete, Remove, Add } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import UseCartContext from "../../hooks/UseCartContext";
import EmptyCart from "./EmptyCart";
import PageTitle from "../../utility/PageTitle";

function ShoppingCart() {
  const { cartItem, removeFromCart, updateQuantity, resetCart } =
    UseCartContext();
  const [address, setAddress] = useState("");

  // Update quantity of a product
  const handleUpdateQuantity = (productId, change) => {
    updateQuantity(productId, change);
  };

  // Remove a product from the cart
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handelReset = () => {
    resetCart();
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 800, margin: "auto" }}>
            <PageTitle title="shopping cart" />
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItem.length === 0 ? (
        <Box>
          <EmptyCart />
        </Box>
      ) : (
        <>
          <List>
            {cartItem.map((item) => (
              <React.Fragment key={item.productId}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={item.imageURL}
                      alt={item.name}
                      sx={{ width: 60, height: 60, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: $${item.price}`}
                  />
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      onClick={() => handleUpdateQuantity(item.productId, -1)}
                      disabled={item.quantity === 1}
                    >
                      <Remove />
                    </IconButton>
                    <Typography variant="body2" sx={{ marginX: 2 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => handleUpdateQuantity(item.productId, 1)}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                  <IconButton onClick={() => handleRemoveItem(item.productId)}>
                    <Delete color="error" />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginRight: 4,
            }}
          >
            <IconButton
              color="primary"
              onClick={handelReset}
              sx={{
                marginRight: 2,
                "&:hover": {
                  backgroundColor: "rgba(136, 194, 115, 0.1)",
                },
              }}
            >
              <Typography variant="body2">Reset Cart</Typography>
              <RestartAltIcon />
            </IconButton>
          </Box>

          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Shipping Address</Typography>
            <TextField
              fullWidth
              placeholder="Enter your address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{ marginY: 2 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 3,
            }}
          >
            <Typography variant="h6">
              Total: $
              {cartItem
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
            {cartItem.length >= 1 && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Checkout
              </Button>
            )}
          </Box>
        </>
      )}
    </Paper>
  );
}

export default ShoppingCart;
