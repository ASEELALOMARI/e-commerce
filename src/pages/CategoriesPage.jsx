import React, { useState } from "react";
import CategoryList from "../components/categories/CategoryList";
import CategoryPage from "../components/categories/CategoryPage";
import { Box } from "@mui/material";

function CategoriesPage() {
  const [id, setId] = useState("9d92209b-d52e-49ca-8bd6-2d22e2e967a1");
  const handelID = (categoryID) => {
    setId(categoryID);
  };
  return (
    <>
      <Box sx={{ mp: 7, p: 4 }}>
        <CategoryList onHandelID={handelID} />
      </Box>
      <Box>
        <CategoryPage categoryID={id} />
      </Box>
    </>
  );
}

export default CategoriesPage;
