import React, { useState } from "react";
import { Avatar, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

import CustomList from "../../List/CustomList";
import UseProductsContext from "../../../hooks/UseProductsContext";
import useAuthContext from "../../../hooks/UseAuthContext";
import ManageProductsHeader from "./ManageProductsHeader";
import { DeleteProduct } from "../../../services/ProductsService";
import { showErrorMessage, showSuccessMessage } from "../../../utility/ToastMessages";

function ManageProduct() {
  const { products, deleteProductById } = UseProductsContext();
  const {token} = useAuthContext();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const productColumns = [
    { id: "productId", label: "ID Code", align: "center" },
    {
      id: "name",
      label: "Product Name",
      render: (value, row) => (
        <Box display="flex" alignItems="center">
          <Avatar src={row.imageURL} alt={value} sx={{ mr: 2 }} />
          {value}
        </Box>
      ),
    },
    {
      id: "categoryName",
      label: "Category",
      render: (value) => (
        <Chip label={value} color="primary" variant="outlined" />
      ),
    },
    { id: "price", label: "Price", align: "center" },
    {
      id: "rating",
      label: "Rating",
      align: "center",
      render: (value, row) => <Rating value={value} readOnly />,
    },
    { id: "stockQuantity", label: "Pieces", align: "center" },
    {
      id: "status",
      label: "Status",
      align: "center",
      render: (value, row) => (
        <Chip
          label={row.stockQuantity > 0 ? "Stock" : "Sold Out"}
          color={row.stockQuantity > 0 ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      id: "updatedDate",
      label: "Updated Date",
      align: "center",
      render: (value) => (
        <Typography variant="body2" color="text.secondary">
          {formatDistanceToNow(new Date(value), { addSuffix: true })}
        </Typography>
      ),
    },
  ];

  const handleEdit = (productId) => {
    navigate(`../editProduct/${productId}`);

  };

// Function to handle dialog opening
const handleOpenDialog = (productId) => {
    setOpenDialog(true);
    setSelectedProduct(productId);
}

// Function to handle dialog closing
const handleCloseDialog = () => setOpenDialog(false);

// Delete function
const handleDelete = async () => {
  try {
    const response = await DeleteProduct(selectedProduct, token);
    if (response.status === 204) {
      deleteProductById(selectedProduct);
      showSuccessMessage("Product deleted successfully");
    } else {
      showErrorMessage("Failed to delete product");
    }
  } catch (error) {
    showErrorMessage("Error occurred while deleting the product");

  } finally {
    handleCloseDialog(); 
  }
};

  const handleSort = () => {
    console.log("Sort products");
    // Add sorting logic here
  };

  const handleAddProduct = () => {
    navigate('../newProduct');
  };
  return (
    <>
      {/* Header */}
      <ManageProductsHeader onSort={handleSort} onAddProduct={handleAddProduct} />

      {/* List */}
      <Box component="section" sx={{ p: 2 }}>
        <CustomList
          title="Product List"
          data={products}
          columns={productColumns}
          actions={["edit", "delete"]}
          onEdit={handleEdit}
          onDelete={handleOpenDialog}
          rowKey={"productId"}
        />
        {/* Delete Confirmation Dialog */}
      <Dialog
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
            Are you sure you want to delete this product? This action cannot be
            undone.
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
      </Dialog>
      </Box>
    </>
  );
}

export default ManageProduct;
