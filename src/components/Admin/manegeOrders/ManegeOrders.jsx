import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Rating,
  Skeleton,
  Typography,
  Chip,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

import CustomList from "../../List/CustomList";
import useAuthContext from "../../../hooks/UseAuthContext";
import ManageOrderHeader from "./ManageOrderHeader";
import { getAllOrders } from "../../../services/OrderServices";

function ManageOrders() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState();
  //   const [selectedOrder, setSelectedOrder] = useState(null);
  //   const [openDialog, setOpenDialog] = useState(false);

  const orderColumns = [
    {
      id: "orderId",
      label: "Order ID",
      align: "center",
    },
    {
      id: "userName",
      label: "User Name",
      align: "center",
    },
    {
      id: "orderStatus",
      label: "Order Status",
      align: "center",
      render: (value) => (
        <Chip
          label={value}
          color={value === "Pending" ? "warning" : "primary"}
          variant="outlined"
        />
      ),
    },
    {
      id: "payment",
      label: "Payment Method",
      align: "center",
      render: (value) => (
        <Typography variant="body2" color="text.secondary">
          {value.method}
        </Typography>
      ),
    },
    {
      id: "orderItems",
      label: "Number of Products",
      align: "center",
      render: (value) => (
        <Typography variant="body2" color="text.primary">
          {value.$values.length} items
        </Typography>
      ),
    },
    {
      id: "orderDate",
      label: "Order Date",
      align: "center",
      render: (value) => (
        <Typography variant="body2" color="text.secondary">
          {formatDistanceToNow(new Date(value), { addSuffix: true })}
        </Typography>
      ),
    },
    {
      id: "isCompleted",
      label: "Completed",
      align: "center",
      render: (value) => (
        <Chip
          label={value ? "Yes" : "No"}
          color={value ? "success" : "error"}
        />
      ),
    },
  ];

  useEffect(() => {
    const getOrdersData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllOrders(token);
        setOrders(response.data.items.$values);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getOrdersData();
  }, [token]);

  //   // Function to handle dialog opening
  //   const handleOpenDialog = (UserId) => {
  //     setOpenDialog(true);
  //     setSelectedUsers(UserId);
  //   };

  //   // Function to handle dialog closing
  //   const handleCloseDialog = () => setOpenDialog(false);

  const handleSort = () => {
    console.log("Sort Orders");
    // Add sorting logic here
  };

  return (
    <>
      {/* Header */}
      <ManageOrderHeader onSort={handleSort} />

      {isLoading ? (
        <Paper
          sx={{ width: "100%", overflow: "hidden", padding: 2, boxShadow: 3 }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Title Skeleton */}
            <Skeleton variant="text" width="40%" height={30} />

            {/* Content Skeleton */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
            </Box>
            {/* action skeleton */}
            <Box display="flex" justifyContent="end" mt={2}>
              <Skeleton variant="rectangular" width="30%" height={40} />
            </Box>
          </Box>
        </Paper>
      ) : (
        <Box>
          {orders && (
            <Box component="section" sx={{ p: 2 }}>
              <CustomList
                title="Order List"
                data={orders}
                columns={orderColumns}
                //actions={["delete"]}
                //onDelete={handleOpenDialog}
                rowKey={"orderId"}
              />
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default ManageOrders;

{
  /* Delete Confirmation Dialog */
}
{
  /* <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="delete-confirmation-dialog"
          aria-describedby="delete-confirmation-description"
        >
          <DialogTitle id="delete-confirmation-dialog">
            Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-confirmation-description">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog> */
}
