import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NotFound = ({ message = "No data found." }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/"); // Redirect to the home page or any other route
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        padding: 3,
      }}
    >
      {/* Icon to indicate "not found" visually */}
      <SearchOffIcon sx={{ fontSize: 80, color: "var(--primary-dark)", marginBottom: 2 }} />

      {/* Message */}
      <Typography variant="h4" sx={{ fontWeight: 500, color: "text.secondary" }}>
        {message}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
        We couldn’t find any item at this moment. Try refreshing the page or come back later.
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

NotFound.prototype = {
  message: PropTypes.string,
}

export default NotFound;
