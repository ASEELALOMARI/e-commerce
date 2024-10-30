import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import {
  AccountCircle,
  PersonAdd,
  Login,
  AdminPanelSettings,
  Logout,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";

function UserNavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAdmin, isLoggedIn, logout } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  // Handle menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 1, // Optional: Adds some space between the items
        }}
      >
        {isLoggedIn && (
          <Typography color="text.primary">
            👋 Hi {storedUser.username}
          </Typography>
        )}
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircle sx={{ color: "var(--primary-main)" }} />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{ mt: 3 }}
      >
        {/* Conditionally show Register and Log In only if the user is not logged in */}
        {!isLoggedIn && (
          <>
            <MenuItem onClick={handleMenuClose} component={Link} to="/register">
              <PersonAdd fontSize="small" sx={{ marginRight: 1 }} />
              Register
            </MenuItem>
            <MenuItem onClick={handleMenuClose} component={Link} to="/login">
              <Login fontSize="small" sx={{ marginRight: 1 }} />
              Log In
            </MenuItem>
          </>
        )}

        {/* Show Admin Dashboard option if the user is an admin */}
        {isAdmin && (
          <MenuItem onClick={handleMenuClose} component={Link} to="/admin">
            <AdminPanelSettings fontSize="small" sx={{ marginRight: 1 }} />
            Admin Dashboard
          </MenuItem>
        )}

        {/* Show Log Out option only if the user is logged in */}
        {isLoggedIn && (
          <MenuItem onClick={handleLogout}>
            <Logout fontSize="small" sx={{ marginRight: 1 }} />
            Log Out
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default UserNavBar;
