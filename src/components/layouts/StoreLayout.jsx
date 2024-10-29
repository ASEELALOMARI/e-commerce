import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";

function StoreLayout() {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* Navigation Bar */}
        <NavBar />

        {/* Main Content (Children) */}
        <Container
          component="main"
          sx={{ flexGrow: 1, paddingTop: 2, paddingBottom: 2 }}
        >
          <Outlet />
        </Container>

        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
}

export default StoreLayout;
