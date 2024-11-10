import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import AddIcon from "@mui/icons-material/Add";

function ManageUsersHeader({ onSort, onAddProduct }) {
  return (
    <Box
      sx={{
        m: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Manage Users
      </Typography>

      {/* Actions */}
      <Box>
        {/* Sort Button */}
        <IconButton
          color="primary"
          onClick={onSort}
          sx={{ mr: 2 }}
          title="Sort Products"
        >
          <SortIcon />
        </IconButton>

        {/* Add New User Button */}
        {/* <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddUser}
        >
          Add New User
        </Button> */}
      </Box>
    </Box>
  );
}

export default ManageUsersHeader;
