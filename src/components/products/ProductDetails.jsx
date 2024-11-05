import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Badge,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import NotFound from "../responses/NotFound";
import { fetchProductById } from "../../services/ProductsService";
import ProductComments from "./ProductComments";

const ProductDetails = () => {
  const { id } = useParams();
  //const { getProductById, isLoading, error } = UseProductsContext();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Handle quantity changes
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  return (
    <>
      {isLoading ? (
        <Typography variant="h3" color="text.secondary">
          Loading...
        </Typography>
      ) : (
        <>
          {product ? (
            <>
              <Box sx={{ padding: 4 }}>
                <Grid container spacing={4}>
                  {/* Left side - Product Image */}
                  <Grid item="true" xs={12} md={6}>
                    <Box
                      component="img"
                      src={product.imageURL}
                      alt={product.name}
                      sx={{ width: "100%", height: "auto", borderRadius: 2 }}
                    />
                  </Grid>

                  {/* Right side - Product Details */}
                  <Grid item="true" xs={12} md={6}>
                    {/* Product Title */}
                    <Typography variant="h4" gutterBottom>
                      {product.name}
                    </Typography>

                    {/* Product Price */}
                    <Typography variant="h5" color="primary" gutterBottom>
                      ${product.price.toFixed(2)}
                    </Typography>

                    {/* Category Badge */}
                    <Chip
                      label={product.categoryName}
                      color="secondary"
                      sx={{ marginBottom: 2 }}
                    />

                    {/* Rating */}
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ marginBottom: 2 }}
                    >
                      <Rating value={product.rating} precision={0.5} readOnly />
                      <Typography variant="body2" sx={{ marginLeft: 1 }}>
                        {product.rating} / 5
                      </Typography>
                    </Box>

                    {/* Description */}
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      paragraph
                    >
                      {product.description}
                    </Typography>

                    {/* Quantity Selector */}
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ marginBottom: 2 }}
                    >
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

                    {/* Action Buttons */}
                    <Box display="flex" gap={2} sx={{ marginTop: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCart />}
                        sx={{ flexGrow: 1 }}
                      >
                        Add to Cart
                      </Button>
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
                <Box sx={{ padding: 4 }}>
                  <ProductComments productId={product.productId} />
                </Box>
              </Box>
            </>
          ) : (
            <NotFound message={error} />
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
