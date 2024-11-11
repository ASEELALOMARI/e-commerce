import { Box, Container } from "@mui/material";
import React from "react";
import CategoryList from "../components/categories/CategoryList";
import Products from "../components/products/Products";

export default function HomePage() {
  return (
    <Container>
      {/* Hero */}
      <Box>
        {/* Todo Add Store hero here */}
      </Box>
      {/* Category list */}
      <Box>
        <CategoryList />
      </Box>

      {/*  Product list */}
      <Box>
        <Products/>
      </Box>
    </Container>
  );
}
