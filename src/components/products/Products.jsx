import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import Product from "./product";
import UseProducts from "../../hooks/UseProducts";
import NotFound from "../responses/NotFound";

export default function Products() {
  const { products, isLoading, error } = UseProducts();
  // Number of skeletons to show while loading
  const skeletonCount = 8;

  const productsList = products.map((product) => {
    return (
      <Grid key={product.productId} size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
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
      <Box sx={{ width: "100%" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ width: "100%", margin: 0 }}
        >
          {isLoading ? (
            Array.from({ length: skeletonCount }).map((_, index) => (
              <Grid item xs={2} sm={4} md={3} key={index}>
                <Box sx={{ padding: 5 }}>
                  <Skeleton
                    variant="rounded"
                    width={210}
                    height={220}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <div style={{ width: "100%" }}>
              {products && products.length > 0 ? (
                <>{productsList}</>
              ) : (
                <NotFound message="No products found" />
              )}
            </div>
          )}
        </Grid>
      </Box>
    </>
  );
}
