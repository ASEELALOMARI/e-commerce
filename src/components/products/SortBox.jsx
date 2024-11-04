import React, { useState, useEffect } from "react";
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";

import UseProducts from "../../hooks/UseProducts";

const SortBox = () => {
  const [sortValue, setSortValue] = useState("name_asc");
  const { getFilteredData } = UseProducts();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    getFilteredData(null, 1, 10, sortValue);
  }, [sortValue]);

  // Open and close menu handlers
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Sort change handler
  const handleSortChange = (value) => {
    setSortValue(value);
    handleClose();
  };

  return (
    <Box>
      <Tooltip title="Sort Products">
        <IconButton size="small" color="primary" onClick={handleClick}>
          <SortIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "sort-button" }}
      >
        <MenuItem onClick={() => handleSortChange("name_asc")}>
          Name (A-Z)
        </MenuItem>
        <MenuItem onClick={() => handleSortChange("name_desc")}>
          Name (Z-A)
        </MenuItem>
        <MenuItem onClick={() => handleSortChange("price_asc")}>
          Price (Low to High)
        </MenuItem>
        <MenuItem onClick={() => handleSortChange("price_desc")}>
          Price (High to Low)
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SortBox;
