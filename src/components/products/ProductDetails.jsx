import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Chip,
  Rating,
  IconButton,
  Skeleton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NotFound from "../responses/NotFound";
import { fetchProductById } from "../../services/ProductsService";
import ProductComments from "./ProductComments";
import UseCartContext from "../../hooks/UseCartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { cartItem, addToCart, updateQuantity } = UseCartContext();
    // Check if the product is already in the cart
    const isInCart = cartItem.some((item) => item.productId === id);
    const quantityInCart = cartItem
      .filter((item) => item.productId === id)
      .reduce((total, item) => total + item.quantity, 0);
  
    const [quantity, setQuantity] = useState(quantityInCart || 1);

  const getProductById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchProductById(id);
      setProduct(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

 // Handle quantity increase
const handleIncrease = () => {
  // Ensure quantity doesn't exceed product stock quantity
  if (quantity < product.stockQuantity) {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    if (isInCart) {
      updateQuantity(id, 1);
    }
  }
};
  // Handle quantity decrease
  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (isInCart) {
        updateQuantity(id, -1);
      }
    }
  };

  // Handle adding item to the cart
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ padding: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" width="100%" height={400} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton
                variant="text"
                width="40%"
                height={30}
                sx={{ mt: 1, mb: 2 }}
              />
              <Skeleton
                variant="rectangular"
                width={100}
                height={30}
                sx={{ mb: 2 }}
              />
              <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="90%" height={15} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="75%" height={15} sx={{ mb: 3 }} />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={50}
                sx={{ mt: 2 }}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          {product ? (
            <Box sx={{ padding: { xs: 2, md: 4 } }}>
              <Grid container spacing={4} alignItems="flex-start">
                {/* Left side - Product Image */}
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={product.imageURL}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "400px", // fixed height for uniformity
                      objectFit: "cover",
                      borderRadius: 2,
                      boxShadow: 1,
                    }}
                  />
                </Grid>

                {/* Right side - Product Details */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h4" gutterBottom>
                    {product.name}
                  </Typography>

                  <Typography variant="h5" color="primary" gutterBottom>
                    ${product.price.toFixed(2)}
                  </Typography>

                  <Chip
                    label={product.categoryName}
                    color="secondary"
                    sx={{ mb: 2 }}
                  />

                  <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                    <Rating value={product.rating} precision={0.5} readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {product.rating} / 5
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>

                  {/* Quantity Selector */}
                  {isInCart ? (
                    <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                      <IconButton
                        onClick={handleDecrease}
                        aria-label="Decrease quantity"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="h6" sx={{ mx: 2 }}>
                        {quantity}
                      </Typography>
                      <IconButton
                        onClick={handleIncrease}
                        aria-label="Increase quantity"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  ) : null}

                  {/* Action Buttons */}
                  <Box display="flex" gap={2} sx={{ mt: 2 }}>
                    {isInCart ? (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled
                        fullWidth
                      >
                        Added to Cart
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCart />}
                        onClick={handleAddToCart}
                        sx={{ flexGrow: 1 }}
                      >
                        Add to Cart
                      </Button>
                    )}
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<FavoriteBorder />}
                      sx={{ flexGrow: 1 }}
                    >
                      Add to Wishlist
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              {/* Comments Section */}
              <Box sx={{ mt: 4 }}>
                <ProductComments productId={product.productId} />
              </Box>
            </Box>
          ) : (
            <NotFound message={error} />
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
