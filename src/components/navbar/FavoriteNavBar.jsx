import React from "react";
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";

function FavoriteNavBar() {
  return (
    <IconButton color="inherit">
      <Favorite sx={{ color: "#EF5A6F" }} />
    </IconButton>
  );
}

export default FavoriteNavBar;
