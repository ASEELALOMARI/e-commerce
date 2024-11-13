import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";


function ManageOrderHeader({ onSort, onAddProduct }) {
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
        Manage Orders
      </Typography>

      {/* Actions */}
      <Box>
        {/* Sort Button */}
        <IconButton
          color="primary"
          onClick={onSort}
          sx={{ mr: 2 }}
          title="Sort Order"
        >
          <SortIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ManageOrderHeader;
