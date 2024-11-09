import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

import CustomList from "../../List/CustomList";
import UseCategoriesContext from "../../../hooks/UseCategoriesContext";
import useAuthContext from "../../../hooks/UseAuthContext";
//import { DeleteProduct } from "../../../services/ProductsService";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utility/ToastMessages";
import ManegeCategoriesHeader from "./ManegeCategoriesHeader";
import { ProductionQuantityLimitsTwoTone } from "@mui/icons-material";
import { MdInventory } from "react-icons/md";
import { deleteCategory } from "../../../services/CategoriesServices";

function ManegeCategories() {
  const { categories, deleteCategoryById } = UseCategoriesContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const CategoryColumns = [
    { id: "id", label: "ID Code", align: "center" },
    {
      id: "categoryName",
      label: "Category Name",
      render: (value, row) => (
        <Box display="flex" alignItems="center">
          <Avatar src={row.imageURL} alt={value} sx={{ mr: 2 }} />
          {value}
        </Box>
      ),
    },
    {
      id: "productCount",
      label: "Number of Products",
      render: (value) => (
        <Chip
          label={`${value}  products`}
          color="default"
          icon={<MdInventory />}
        />
      ),
    },
    {
      id: "date",
      label: "Created Date",
      align: "center",
      render: (value) => (
        <Typography variant="body2" color="text.secondary">
          {formatDistanceToNow(new Date(value), { addSuffix: true })}
        </Typography>
      ),
    },
  ];

  const handleEdit = (Id) => {
    navigate(`../editCategory/${Id}`);
  };

  // Function to handle dialog opening
  const handleOpenDialog = (Id) => {
    setOpenDialog(true);
    setSelectedCategory(Id);
  };

  // Function to handle dialog closing
  const handleCloseDialog = () => setOpenDialog(false);

  // Delete function
  const handleDelete = async () => {
    try {
      const response = await deleteCategory(selectedCategory, token);
      if (response.status === 204) {
        deleteCategoryById(selectedCategory);
        showSuccessMessage("Category deleted successfully");
      } else {
        showErrorMessage("Failed to delete category");
      }

    } catch (error) {
      showErrorMessage("Error occurred while deleting the category");

    } finally {
      handleCloseDialog();
    }
  };

  const handleSort = () => {
    console.log("Sort Categories");
    //Todo: Add sorting logic here
  };

  const handleAddCategory = () => {
    navigate("../newCategory");
  };
  return (
    <>
      {/* Header */}
      <ManegeCategoriesHeader
        onSort={handleSort}
        onAddCategories={handleAddCategory}
      />

      {/* List */}
      <Box component="section" sx={{ p: 2 }}>
        <CustomList
          title="Categories List"
          data={categories}
          columns={CategoryColumns}
          actions={["edit", "delete"]}
          onEdit={handleEdit}
          onDelete={handleOpenDialog}
          rowKey={"id"}
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
              Are you sure you want to delete this Category? This action cannot
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
        </Dialog>
      </Box>
    </>
  );
}

export default ManegeCategories;
