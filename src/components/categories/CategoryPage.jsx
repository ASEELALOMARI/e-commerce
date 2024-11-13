import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, Paper } from "@mui/material";

import { getCategoryByID } from "../../services/CategoriesServices";
import Product from "../products/Product";
import NotFound from "../responses/NotFound";

const CategoryPage = ({ categoryID }) => {
  const { id } = useParams();
  let useID = id;
  if (useID === undefined) {
    useID = categoryID;
  }

  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await getCategoryByID(useID);
        setCategory(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [useID]);

  if (isLoading) {
    return (
      <Typography variant="h5" align="center" color="textSecondary">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return <NotFound message={error} />;
  }

  if (!category) {
    return <NotFound message="Category not found." />;
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Category Banner */}
      <Paper
        sx={{
          width: "100%",
          padding: 1,
          display: "flex",
          alignItems: "center",
          gap: 0,
          flexDirection: "row",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box
          sx={{
            width: "10%",
            height: 100,
            borderRadius: 0,
            background: `url(${category.imageURL})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        />

        <Box>
          <Typography variant="h3" fontWeight="bold" color="primary.dark">
            {category.categoryName}
          </Typography>
        </Box>
      </Paper>

      {/* Products List */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Products in {category.categoryName}
        </Typography>
        <Grid container spacing={3}>
          {category.products.$values.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.productId}>
              <Product data={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

CategoryPage.propTypes = {
  categoryID: PropTypes.string,
};

export default CategoryPage;
