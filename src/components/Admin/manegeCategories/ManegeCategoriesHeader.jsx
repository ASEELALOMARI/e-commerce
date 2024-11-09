import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";

function ManegeCategoriesHeader({ onSort, onAddCategories}) {
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
        Manege Categories
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
          onClick={onAddCategories}
        >
          Add New Category
        </Button>
      </Box>
    </Box>
  );
}

ManegeCategoriesHeader.prototype={
  onSort: PropTypes.func,
  onAddCategories: PropTypes.func,
 };

export default ManegeCategoriesHeader;
