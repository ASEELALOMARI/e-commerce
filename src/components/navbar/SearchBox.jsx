import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

import UseProductsContext from "../../hooks/UseProductsContext";
import useDebounce from "../../utility/useDebounce";

const SearchBox = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchValue } = UseProductsContext();
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debouncedValue) {
      setSearchValue(debouncedValue);
    }
  }, [debouncedValue]);

  const handleSearch = async (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={inputValue}
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
