import React from "react";
import { Box, Skeleton, Typography, Card } from "@mui/material";
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
      <Grid item key={product.productId} size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
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
              <Grid item key={index} size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
                <Card sx={{ maxWidth: 345, boxShadow: 1, borderRadius: 2 }}>
                  <Box sx={{ padding: 5 }}>
                    <Skeleton variant="rounded" width={210} height={200} />
                    <Box sx={{ padding: 2 }}>
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={100} />
                    </Box>
                  </Box>
                </Card>
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
