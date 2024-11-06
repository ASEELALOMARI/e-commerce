import React from "react";
import { ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import styles from "../../styles/ListStyle.module.css";

const CustomNavItem = ({ to, icon: Icon, label, open }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive ? styles.list__item_active : styles.list__item
    }
    style={{ textDecoration: "none" }}
  >
    <Box className={styles.box}>
      <ListItem button='true'>
        <ListItemIcon>
          <Icon className={styles.list__icon} />
        </ListItemIcon>
        {open && (
          <ListItemText primary={label} sx={{ color: "text.secondary" }} />
        )}
      </ListItem>
    </Box>
  </NavLink>
);

export default CustomNavItem;
