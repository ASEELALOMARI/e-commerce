import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import SearchBox from "./SearchBox";
import UserNavBar from "./UserNavBar";
import CartNavBar from "./CartNavBar";
import FavoriteNavBar from "./FavoriteNavBar";

const NavBar = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none", paddingX: 2 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo Area */}
        <Typography variant="h6" component="div" sx={{ color: "black" }}>
          Store
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit" href="/" sx={{ color: "black" }}>
            Home
          </Button>
          <Button color="inherit" href="/products" sx={{ color: "black" }}>
            Products
          </Button>
          <Button color="inherit" href="/new" sx={{ color: "black" }}>
            New
          </Button>
          <Button color="inherit" href="/category" sx={{ color: "black" }}>
            Category
          </Button>
        </Box>

        {/* Search Field */}
        <SearchBox />

        {/* User Actions */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* User Icon with Dropdown */}
          <UserNavBar />

          {/* Cart Icon */}
          <CartNavBar />

          {/* Favorite Icon */}
          <FavoriteNavBar />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
