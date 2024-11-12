import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Box,
  Rating,
  Badge,
} from "@mui/material";
import {
  AddShoppingCart,
  ShoppingCart,
  FavoriteBorder,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import UseCartContext from "../../hooks/UseCartContext";
import Theme from "../../styles/Theme";

function Product({ data }) {
  const { cartItem, addToCart } = UseCartContext();

  // Check if the product is already in the cart
  const isInCart = cartItem.some((item) => item.productId === data.productId);
  const numberInCart = cartItem
  .filter((item) => item.productId === data.productId)
  .reduce((total, item) => total + item.quantity, 0);

  const handleAddItemToCart = () => {
    addToCart(data);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="200"
        image={data.imageURL}
        alt={data.name}
        sx={{ objectFit: "cover" }}
      />

      {/* Product Name and Price */}
      <CardContent>
        <Box>
          <Rating value={data.rating} precision={0.5} readOnly />
        </Box>
        <Typography
          variant="h6"
          component={Link}
          to={`/productsDetails/${data.productId}`}
          onClick={(e) => e.stopPropagation()}
          gutterBottom
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {data.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          ${data.price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Actions: Add to Cart and Wishlist */}
      <CardActions disableSpacing>
        <IconButton
          aria-label="Add to Cart"
          color="primary"
          onClick={handleAddItemToCart}
        >
          {isInCart ? (
            <Badge
              badgeContent={numberInCart}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: Theme.palette.primary.light,
                  color: Theme.palette.primary.contrastText,
                },
              }}
            >
              {" "}
              <ShoppingCart />{" "}
            </Badge>
          ) : (
            <AddShoppingCart />
          )}
        </IconButton>
        <IconButton aria-label="Add to Wishlist" color="secondary">
          <FavoriteBorder />
        </IconButton>
      </CardActions>
    </Card>
  );
}

Product.propTypes = {
  data: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    imageURL: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default Product;
