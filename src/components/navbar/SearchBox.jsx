import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import UseProducts from "../../hooks/UseProducts";

const SearchBox = () => {
  const { getFilteredData } = UseProducts();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
      getFilteredData(searchValue);
  }, [searchValue]);

  const handleSearch = async (event) => {
    const { value } = event.target;
    setSearchValue(value);    
  }

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Search..."
        onChange={handleSearch}
        size="small"
        InputProps={{
          startAdornment: <Search color="action" />,
        }}
        sx={{
          width: 300,
          backgroundColor: "#f5f5f5",
          borderRadius: 1,
        }}
      />
    </>
  );
};

export default SearchBox;
