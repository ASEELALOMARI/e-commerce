import React, { useState, useEffect } from "react";
import { Box, Pagination } from "@mui/material";

import UseProducts from "../../hooks/UseProducts";

function PaginationBox() {
  const [page, setPage] = useState(1);
  const { getFilteredData, totalItems } = UseProducts();

  const totalPageNumbers = Math.ceil(totalItems/8);

  useEffect(() => {
    getFilteredData('',page);
  }, [page]);

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{ width: "100%", m: 3, alignItems: "center", justifyItems: "center" }}
    >
      <Pagination
        count={totalPageNumbers}
        color="primary"
        defaultPage={1}
        siblingCount={0}
        page={page}
        onChange={handleChange}
      />
    </Box>
  );
}

export default PaginationBox;
