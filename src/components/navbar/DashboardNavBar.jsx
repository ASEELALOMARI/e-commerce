import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Divider } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

import reactLogo from '../../assets/react.svg';

const DashboardNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle user menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", paddingX: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Section: Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={reactLogo} alt="Store Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Admin Dashboard
          </Typography>
        </Box>

        {/* Right Section: Notification and User Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Notification Icon */}
          <IconButton color="inherit">
            <Notifications sx={{ color: "gray" }} />
          </IconButton>

          {/* User Icon with Dropdown */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle sx={{ color: 'var(--primary-main)'  }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ mt: 3 }}
          >
            <MenuItem onClick={handleMenuClose} component={Link} to="/">
              Back to Store
            </MenuItem>
            <Divider/>
            <MenuItem onClick={handleMenuClose} component={Link} to="admin/profile">
              Admin Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="admin/profile">
              logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavBar;