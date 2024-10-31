import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { AddShoppingCart, FavoriteBorder } from "@mui/icons-material";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import ProductDetails from "./ProductDetails";

function Product({ data }) {
  const navigate = useNavigation();
  const productsDetailsPage = ()=>
  {
    <ProductDetails state={data} />
  }
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
        <IconButton aria-label="Add to Cart" color="primary">
          <AddShoppingCart />
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
  }).isRequired,
};

export default Product;
