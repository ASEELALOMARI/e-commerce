import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UserProfile = ({ user }) => {
  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          p: 2,
          bgcolor: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={user.imageURL}
            alt={user.userName}
            sx={{ width: 80, height: 80, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {user.userName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Profile Details Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Full Name
          </Typography>
          <Typography variant="body1">{user.userName || "N/A"}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Phone Number
          </Typography>
          <Typography variant="body1">{user.phoneNumber || "N/A"}</Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="textSecondary">
            Address
          </Typography>
          <Typography variant="body1">{user.address || "N/A"}</Typography>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 3, mb: 2 }} />

      {/* Contact Info */}
      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
        My Email Address
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "secondary.main" }}>{user.email[0]}</Avatar>
        <Box>
          <Typography variant="body1">{user.email}</Typography>
          <Typography variant="caption" color="textSecondary">
            Updated {new Date(user.updatedDate).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

UserProfile.propTypes = {
    user: PropTypes.shape({
      userName: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      phoneNumber: PropTypes.string,
      imageURL: PropTypes.string,
      updatedDate: PropTypes.string,
    }).isRequired,
};

export default UserProfile;

