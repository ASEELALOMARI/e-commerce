import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import { getUserOrders } from "../../services/OrderServices";
import useAuthContext from "../../hooks/UseAuthContext";
import NotFound from "../responses/NotFound";

const UserOrders = () => {
  const { token, user } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getUserOrders(token, user.userId);
        setOrders(response.data.$values);
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, user.userId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      {error && <NotFound message={error} />}
      {!orders && orders.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          No orders found.
        </Typography>
      ) : (
        orders.map((order) => (
          <Paper
            key={order.orderId}
            sx={{
              padding: 3,
              marginBottom: 4,
              boxShadow: 2,
              borderRadius: 2,
            }}
          >
            <Grid container spacing={2}>
              {/* Order Info */}
              <Grid item xs={12} md={8}>
                <Typography variant="h6">Order ID: {order.orderId}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Order Date: {new Date(order.orderDate).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status:{" "}
                  <Chip
                    label={order.orderStatus}
                    color={order.isCompleted ? "success" : "warning"}
                    variant="outlined"
                    size="small"
                  />
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Payment Method: {order.payment.method} ({order.payment.status}
                  )
                </Typography>
              </Grid>

              {/* Total Amount */}
              <Grid
                item
                xs={12}
                md={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="h6" color="primary">
                  Total: ${order.totalAmount.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

            {/* Order Items */}
            <Divider sx={{ marginY: 2 }} />
            <List>
              {order.orderItems.$values.map((item) => (
                <ListItem key={item.productId} alignItems="flex-start">
                  <Avatar
                    variant="square"
                    src={item.imageURL} // Add imageURL if available in the data
                    alt={item.productName}
                    sx={{ width: 60, height: 60, marginRight: 2 }}
                  />
                  <ListItemText
                    primary={
                      <Typography variant="subtitle1">
                        {item.productName}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          Quantity: {item.quantity}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ marginLeft: 2 }}
                        >
                          Price: ${item.totalPrice.toFixed(2)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default UserOrders;
