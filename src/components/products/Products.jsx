import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";


import Product from './product';
import UseProducts from '../../hooks/UseProducts';

export default function Products() {
  const { products } = UseProducts();

  const productsList = products.map((product) => {
    return (
      <Grid key={product.productId} size={{ xs: 12, sm: 4, md: 4, lg:3 }}>
        <Product data={product} />
      </Grid>
    );
  });
  return (
    <>
    {/* Title */}
    <Box sx={{ m: 4 }}>
      <Typography variant="h2">Products</Typography>
    </Box>
    {/* List */}
    <Box component="section">
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {productsList}
      </Grid>
    </Box>
  </>
  )
}
