import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";

function ManageProductsHeader({ onSort, onAddProduct }) {
  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Manage Products
      </Typography>

      {/* Actions */}
      <Box>
        {/* Sort Button */}
        <IconButton
          color="primary"
          onClick={onSort}
          sx={{ mr: 2 }}
          title="Sort Products"
        >
          <SortIcon />
        </IconButton>

        {/* Add New Product Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddProduct}
        >
          Add New Product
        </Button>
      </Box>
    </Box>
  );
}

export default ManageProductsHeader;
