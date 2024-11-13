import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  CircularProgress,
} from "@mui/material";
import { Delete, Remove, Add } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import UseCartContext from "../../hooks/UseCartContext";
import EmptyCart from "./EmptyCart";
import PageTitle from "../../utility/PageTitle";
import PaymentMethodSelector from "./PaymentMethodSelector";
import { sendNewOrder } from "../../services/OrderServices";
import useAuthContext from "../../hooks/UseAuthContext";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../utility/ToastMessages";

function ShoppingCart() {
  const { cartItem, removeFromCart, updateQuantity, resetCart } =
    UseCartContext();
  const { token } = useAuthContext();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("CreditCard");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Update quantity of a product
  const handleUpdateQuantity = (productId, change) => {
    updateQuantity(productId, change);
  };

  // Remove a product from the cart
  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleReset = () => {
    resetCart();
  };

  // Handle checkout submission
  const handleSubmit = async () => {
    const orderData = {
      orderItems: cartItem.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      method: paymentMethod,
    };
    setIsLoading(true);
    try {
      const response = await sendNewOrder(token, orderData);
      showSuccessMessage(response.message);
      resetCart();
      navigate("/user-orders");
    } catch (err) {
      showErrorMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 800, margin: "auto" }}>
      <PageTitle title="Shopping Cart" />
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>

      {cartItem.length === 0 ? (
        <EmptyCart />
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

          {/* Reset Cart */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 2,
            }}
          >
            <IconButton color="primary" onClick={handleReset}>
              <Typography variant="body2">Reset Cart</Typography>
              <RestartAltIcon />
            </IconButton>
          </Box>

          {/* Payment Method Selection */}
          <PaymentMethodSelector
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          {/* Checkout and Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Typography variant="h6">
              Total: $
              {cartItem
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={cartItem.length < 1}
              onClick={handleSubmit}
            >
              Checkout
            </Button>
          </Box>
          {isLoading && (
            <Box m={2}>
              <CircularProgress color="primary" />
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}

export default ShoppingCart;
