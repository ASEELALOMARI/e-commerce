import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Rating,
  Skeleton,
  Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

import CustomList from "../../List/CustomList";
import UseUsersContext from "../../../hooks/UseUsersContext";
import useAuthContext from "../../../hooks/UseAuthContext";
import ManageUsersHeader from "./ManageUsersHeader";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../utility/ToastMessages";
import { DeleteUser } from "../../../services/UsersServices";

function ManageUsers() {
  const { users, DeleteUserByID, isLoading } = UseUsersContext();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const UsersColumns = [
    { id: "userId", label: "ID Code", align: "center" },
    {
      id: "userName",
      label: "User Name",
      render: (value, row) => (
        <Box display="flex" alignItems="center">
          <Avatar src={row.imageURL} alt={value} sx={{ mr: 2 }} />
          {value}
        </Box>
      ),
    },
    {
      id: "email",
      label: "Email",
      align: "center",
    },
    { id: "address", label: "Address", align: "center" },
    { id: "phoneNumber", label: "Phone Number", align: "center" },
    {
      id: "updatedDate",
      label: "Updated Date",
      align: "center",
      render: (value) => (
        <Typography variant="body2" color="text.secondary">
          {formatDistanceToNow(new Date(value), { addSuffix: true })}
        </Typography>
      ),
    },
  ];

  // Function to handle dialog opening
  const handleOpenDialog = (UserId) => {
    setOpenDialog(true);
    setSelectedUsers(UserId);
  };

  // Function to handle dialog closing
  const handleCloseDialog = () => setOpenDialog(false);

  // Delete function
  const handleDelete = async () => {
    try {
      const response = await DeleteUser(selectedUsers, token);
      if (response.status === 204) {
        DeleteUserByID(selectedUsers);
        showSuccessMessage("User deleted successfully");
      } else {
        showErrorMessage("Failed to delete User");
      }
    } catch (error) {
      showErrorMessage("Error occurred while deleting the User");
    } finally {
      handleCloseDialog();
    }
  };

  const handleSort = () => {
    console.log("Sort Users");
    // Add sorting logic here
  };

  return (
    <>
      {/* Header */}
      <ManageUsersHeader onSort={handleSort} />

      {isLoading ? (
        <Paper
          sx={{ width: "100%", overflow: "hidden", padding: 2, boxShadow: 3 }}
        >
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Title Skeleton */}
            <Skeleton variant="text" width="40%" height={30} />

            {/* Content Skeleton */}
            <Box display="flex" flexDirection="column" gap={1}>
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
              <Skeleton variant="rectangular" height={80} width="100%" />
            </Box>
            {/* action skeleton */}
            <Box display="flex" justifyContent="end" mt={2}>
              <Skeleton variant="rectangular" width="30%" height={40} />
            </Box>
          </Box>
        </Paper>
      ) : (
        <Box component="section" sx={{ p: 2 }}>
          <CustomList
            title="Users List"
            data={users}
            columns={UsersColumns}
            actions={["delete"]}
            onDelete={handleOpenDialog}
            rowKey={"userId"}
          />
          {/* Delete Confirmation Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="delete-confirmation-dialog"
            aria-describedby="delete-confirmation-description"
          >
            <DialogTitle id="delete-confirmation-dialog">
              Confirm Deletion
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="delete-confirmation-description">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDelete} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
}

export default ManageUsers;
