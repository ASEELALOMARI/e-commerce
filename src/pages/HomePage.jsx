import { Box, Container } from "@mui/material";
import React from "react";
import CategoryList from "../components/categories/CategoryList";
import Products from "../components/products/Products";
import Hero from "../components/home/Hero";
import HomeLayout from "../components/layouts/HomeLayout";

export default function HomePage() {
  return (
    <HomeLayout>
      {/* Hero */}
      <Box>
        <Hero />
      </Box>
      {/* Category list */}
      <Box sx={{ px: 12 }}>
        <CategoryList />
      </Box>

      {/*  Product list */}
      <Box sx={{ px: 12 }}>
        <Products />
      </Box>
    </HomeLayout>
  );
}
