import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import { Notifications, AccountCircle, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

import reactLogo from "../../assets/DFlowLogo.png";
import useAuthContext from "../../hooks/UseAuthContext";

const DashboardNavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout } = useAuthContext();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  // Handle user menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none", paddingX: 2 }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Section: Logo and Title */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={reactLogo}
            alt="Store Logo"
            style={{ height: 70, marginRight: 10 }}
          />
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Admin Dashboard
          </Typography>
        </Box>

        {/* Right Section: Notification and User Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/*admin name */}
          <Typography variant="subtitle2" sx={{ color: "gray" }}>
            👋{storedUser.username}
          </Typography>

          {/* Notification Icon */}
          <IconButton color="inherit">
            <Notifications sx={{ color: "gray" }} />
          </IconButton>

          {/* User Icon with Dropdown */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle sx={{ color: "var(--primary-main)" }} />
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
            <Divider />
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="/user-profile"
            >
              Admin Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout fontSize="small" sx={{ marginRight: 1 }} />
              Log Out
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavBar;
