import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home,
  Category,
  NewReleases,
  ShoppingBag,
} from "@mui/icons-material";
import SearchBox from "./SearchBox";
import UserNavBar from "./UserNavBar";
import CartNavBar from "./CartNavBar";
import FavoriteNavBar from "./FavoriteNavBar";

import LogoText from "../../../public/DFlowLogoText.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", boxShadow: "none", paddingX: 2 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center">
          <img
            src={LogoText}
            alt="Store Logo"
            style={{
              width: "120px",
              height: "auto",
              marginRight: "8px",
            }}
          />
        </Box>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button component={Link} to="/" sx={{ color: "black" }}>
            Home
          </Button>
          <Button component={Link} to="/products" sx={{ color: "black" }}>
            Products
          </Button>
          <Button component={Link} to="/category" sx={{ color: "black" }}>
            Category
          </Button>
        </Box>

        {/* Search Field */}
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <SearchBox />
        </Box>

        {/* User Actions */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <UserNavBar />
          <CartNavBar />
          <FavoriteNavBar />
        </Box>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Drawer for Mobile Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, padding: 2 }} role="presentation">
          {/* User Actions in Drawer */}
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <UserNavBar />
            <CartNavBar />
            <FavoriteNavBar />
          </Box>
          <Divider />
          <List>
            <ListItem button="true" component={Link} to="/">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button="true" component={Link} to="/products">
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button="true" component={Link} to="/category">
              <ListItemText primary="Category" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
