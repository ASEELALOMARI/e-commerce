import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function UserNavBar() {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <AccountCircle sx={{ color: 'var(--primary-main)' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 3 }}
      >
        <MenuItem onClick={handleMenuClose}>Register</MenuItem>
        <MenuItem onClick={handleMenuClose}>Log In</MenuItem>
      </Menu>
    </>
  );
}

export default UserNavBar;
