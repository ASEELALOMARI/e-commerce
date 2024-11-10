import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("../products"); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "70vh", textAlign: "center" }}
    >
      <Box
        sx={{
          width: 100,
          height: 100,
          backgroundColor: "#f0f8ff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: 50, color: "#9e9e9e" }} />
      </Box>
      <Typography variant="h6" sx={{ color: "#333", fontWeight: 500 }}>
        Your cart is empty
      </Typography>
      <Typography variant="body2" sx={{ color: "#757575", marginBottom: 3 }}>
        Looks like you haven’t made your choice yet...
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleShopNow}
        sx={{
          backgroundColor: "#88C273",
          "&:hover": { backgroundColor: "#76a559" },
          padding: "8px 16px",
        }}
      >
        Shop Now
      </Button>
    </Box>
  );
};

export default EmptyCart;
