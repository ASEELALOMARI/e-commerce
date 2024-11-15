import React from "react";
import { Box, Container, Typography } from "@mui/material";
import PropTypes from "prop-types";

import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";

const AuthLayout = ({ children, image, title, message }) => {
  return (
    <>
      {/* Navigation Bar */}
      <NavBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #faf3ed, #f2dcc5, #ffffff)", // Soft gradient background
          padding: 4,
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            borderRadius: 4,
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            bgcolor: "#fffaf7", // Light main background
            width:'100%'
          }}
        >
          {/* Left Side - Form Area */}
          <Box
            sx={{
              flex: 1,
              padding: 5,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              bgcolor: "#fffaf7", // Light main background
              borderRadius: "12px 0 0 12px",
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, color: "#002447" }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: "#bc672c" }}>
              {message}
            </Typography>
            {children}
          </Box>

          {/* Right Side - Illustration Area */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(to right, #002447, #79c5e7)",
              position: "relative",
              borderRadius: "0 12px 12px 0",
              width:'100%'
            }}
          >
            <img
              src={image}
              alt="E-commerce illustration"
              style={{
                maxWidth: "80%",
                borderRadius: "12px",
                // boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
              }}
            />
            {/* Decorative Elements */}
            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 50,
                height: 50,
                borderRadius: "50%",
                bgcolor: "#fffaf7",
                opacity: 0.5,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                width: 30,
                height: 30,
                borderRadius: "50%",
                bgcolor: "#fffaf7",
                opacity: 0.3,
              }}
            />
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
};

export default AuthLayout;
