import React from "react";
import { Box, Pagination } from "@mui/material";

import UseProductsContext from "../../hooks/UseProductsContext";

function PaginationBox() {
  const { pageValue, setPageValue, totalItems, pageSizeValue } = UseProductsContext();

  const totalPageNumbers = Math.ceil(totalItems/pageSizeValue);

  const handleChange = (event, newPage) => {
    setPageValue(newPage);
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
        page={pageValue}
        onChange={handleChange}
      />
    </Box>
  );
}

export default PaginationBox;
