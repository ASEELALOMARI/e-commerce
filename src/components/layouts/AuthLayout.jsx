import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
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
          //width: "100vw",
          background: "linear-gradient(135deg, #f0f4ff, #cce2ff, #b3d1ff)", // Soft gradient background
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
            bgcolor: "rgba(255, 255, 255, 0.8)", // Glassmorphism effect
            backdropFilter: "blur(10px)",
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
              bgcolor: "white",
              borderRadius: "12px 0 0 12px", // Rounded edges on one side
            }}
          >
            <Typography variant="h4" sx={{ mb: 3, color: "#333" }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, color: "#555" }}>
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
              background: "linear-gradient(to right, #6bc4ff, #83d5f8)",
              position: "relative",
              borderRadius: "0 12px 12px 0",
            }}
          >
            <img
              src={image}
              alt="E-commerce illustration"
              style={{
                maxWidth: "80%",
                borderRadius: "12px",
                boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
              }}
            />
            {/* Decorative Elements */}
            <Box
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 'auto',
                height: 50,
                borderRadius: "50%",
                bgcolor: "#ffffff44",
                backdropFilter: "blur(10px)",
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
                bgcolor: "#ffffff33",
                backdropFilter: "blur(10px)",
              }}
            />
          </Box>
        </Container>
        {/* Footer */}
      </Box>
      <Footer />
    </>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
  massage: PropTypes.string,
};

export default AuthLayout;
