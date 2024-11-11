import React, { useState } from "react";
import { Typography, Box, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

import UseCategoriesContext from "../../hooks/UseCategoriesContext";

function CategoryList() {
  const { categories } = UseCategoriesContext();

  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    console.log("categoryID", id);
    //navigate(`/category/${id}`);
  };

  return (
    <Box sx={{ py: 4, px: 12 }}>
      <Grid container spacing={4} justifyContent="space-between">
        {categories.map((category) => (
          <Grid item="true" xs={6} sm={4} md={3} lg={2} key={category.id}>
             <Box
              onClick={() => handleCategoryClick(category.id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textAlign: "center",
                "&:hover .avatar": {
                  transform: "scale(1.1)",
                  borderColor: "#1976d2", // Change border color on hover
                  boxShadow: 3,
                },
                "&:hover .categoryName": {
                  color: "#1976d2", // Change text color on hover
                },
              }}
            >
              <Avatar
                src={category.imageURL}
                alt={category.categoryName}
                className="avatar"
                sx={{
                  width: 100,
                  height: 100,
                  mb: 1,
                  boxShadow: 1,
                  border: "2px solid #e0e0e0",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                }}
              />
              <Typography
                variant="body1"
                fontWeight="bold"
                className="categoryName"
                sx={{ transition: "color 0.3s ease" }}
              >
                {category.categoryName}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CategoryList;
