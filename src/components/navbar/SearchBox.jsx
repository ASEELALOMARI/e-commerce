import React from "react";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBox = () => {
  return (
    <>
      <TextField
        variant="outlined"
        placeholder="Search..."
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
