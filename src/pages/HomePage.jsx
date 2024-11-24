import { Box, Container } from "@mui/material";
import React from "react";
import CategoryList from "../components/categories/CategoryList";
import Products from "../components/products/Products";
import Hero from "../components/home/Hero";
import HomeLayout from "../components/layouts/HomeLayout";
import PageTitle from "../utility/PageTitle";

export default function HomePage() {
  return (
    <HomeLayout>
      <PageTitle title="Home" />
      {/* Hero */}
      <Box>
        <Hero />
      </Box>
      {/* Category list */}
      <Box sx={{ px: { xs: 2, md: 8 } }}>
        <CategoryList />
      </Box>

      {/*  Product list */}
      <Box sx={{ px: { xs: 2, md: 8 } }}>
        <Products />
      </Box>
    </HomeLayout>
  );
}
