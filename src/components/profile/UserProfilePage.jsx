import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

import UserProfile from "./UserProfile";
import useAuthContext from "../../hooks/UseAuthContext";
import NotAuthorized from "../responses/NotAuthorized";
import { getUserByID, updateUserProfile } from "../../services/UsersServices";
import ProfileSkeleton from "./ProfileSkeleton";
import UpdatedFrom from "../form/UpdatedForm";

const UserProfilePage = () => {
  const fields = [
    {
      label: "User Name",
      type: "text",
      id: "User-name",
      name: "userName",
      placeholder: "User Name",
      required: true,
      minLength: 3,
      maxLength: 25,
    },
    {
      label: "Address",
      type: "text",
      id: "User-Address",
      name: "address",
      placeholder: "Address",
      required: true,
      minLength: 10,
      maxLength: 500,
    },
    {
      label: "Phone Number",
      type: "text",
      id: "Phone-Number",
      name: "phoneNumber",
      placeholder: "Phone Number",
      required: true,
      min: 10,
      max: 11,
    },
    {
      label: "Image",
      type: "file",
      id: "Product-image",
      name: "image",
    },
  ];
  const { user, token } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [error, setError] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const userId = user.userId;

  // Check if the user is authenticated and has a userId
  if (!user.userId) {
    return <NotAuthorized />;
  }

  const getUserDataById = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUserByID(id, token);
      setUserData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  // Get the user data
  useEffect(() => {
    getUserDataById(userId);
  }, [userId]);

  // Function to handle the edit form submission
  const handleFormSubmit = async (formData) => {
    setIsSubmitLoading(true);
    setSubmitError(null);
    try {
      const response = await updateUserProfile(userId, token, formData);
      setUserData(response.data);
      setIsEdit(false);
    } catch (error) {
      setSubmitError(error.response.data.message);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleEdit = () => {
    console.log("handleEdit");
    setIsEdit(true);
  };

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      {/* Main content area */}
      <Paper sx={{ width: "100%", maxWidth: 800, p: 3, boxShadow: 3 }}>
        {/* Loading State */}
        {isLoading && <ProfileSkeleton />}

        {/* Error State */}
        {error && <NotFound message={error} />}

        {/* Profile View or Edit Form */}
        {!isLoading && !error && (
          <>
            {/* Profile Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                User Profile
              </Typography>
              {!isEdit ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEdit(false)}
                >
                  Back to Profile
                </Button>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Profile Edit Form */}
            {isEdit ? (
              <>
                <UpdatedFrom
                  formTitle="Update Profile"
                  fields={fields}
                  initialData={userData}
                  onSubmit={handleFormSubmit}
                />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                {submitError && (
                  <Typography sx={{ mb: 2, color: "error.main" }}>{submitError}</Typography>
                )}
                {isSubmitLoading && <CircularProgress />}

                </Box>
              </>
            ) : (
              <>{userData && <UserProfile user={userData} />}</>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default UserProfilePage;
