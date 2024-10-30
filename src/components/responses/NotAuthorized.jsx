import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock"; 

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 3,
      }}
    >
      {/* Icon to indicate "not authorized" visually */}
      <LockIcon sx={{ fontSize: 80, color: "var(--primary-dark)", marginBottom: 2 }} />

      {/* Message */}
      <Typography variant="h4" sx={{ fontWeight: 500, color: "text.secondary" }}>
        Access Denied
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
        You don't have permission to view this page. Please contact your administrator if you believe this is a mistake.
      </Typography>

      {/* Go Back Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGoBack}
        sx={{ marginTop: 3, paddingX: 4 }}
      >
        Go Back
      </Button>
    </Box>
  );
};


export default NotAuthorized;
