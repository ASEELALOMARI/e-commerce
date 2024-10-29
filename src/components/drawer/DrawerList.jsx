import React from "react";
import { List, Divider } from "@mui/material";
import {
  MdOutlineCategory,
  MdPerson,
  MdShoppingCart,
  MdInventory,
  MdSettings,
} from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import CustomNavItem from "./CustomNavItem";

const DrawerList = ({ open }) => {
  return (
    <List>
      {/* Drawer Sections */}
      <CustomNavItem
        to="/manage-products"
        icon={MdInventory}
        label="Manage Products"
        open={open}
      />
      <CustomNavItem
        to="/manage-categories"
        icon={MdOutlineCategory}
        label="Manage Categories"
        open={open}
      />
      <CustomNavItem
        to="/manage-users"
        icon={AiOutlineUsergroupAdd}
        label="Manage Users"
        open={open}
      />
      <CustomNavItem
        to="/manage-orders"
        icon={MdShoppingCart}
        label="Manage Orders"
        open={open}
      />
      <Divider sx={{ marginY: 2 }} />
      <CustomNavItem
        to="/settings"
        icon={MdSettings}
        label="Settings"
        open={open}
      />
    </List>
  );
};

export default DrawerList;
