import React from "react";
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function FavoriteNavBar() {
  const navigate = useNavigate();
  const handelOpenWishlist = ()=>{

    navigate("/user-wishlist");
  }
  return (
    <IconButton color="inherit" onClick={handelOpenWishlist}>
      <Favorite sx={{ color: "#EF5A6F" }} />
    </IconButton>
  );
}

export default FavoriteNavBar;
