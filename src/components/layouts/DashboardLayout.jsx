import React from "react";
import DashboardNavBar from "../navbar/DashboardNavBar";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import DashboardFooter from "../footer/DashboardFooter";
import CustomDrawer from "../drawer/CustomDrawer";

function DashboardLayout() {
  return (
    <>
      <CustomDrawer>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          {/* Navigation Bar */}
          <DashboardNavBar />
          {/* Main Content (Children) */}
          <Container
            component="main"
            sx={{ flexGrow: 1, paddingTop: 2, paddingBottom: 2 }}
          >
            <Outlet />
          </Container>

          {/* Footer */}
          <DashboardFooter />
        </Box>
      </CustomDrawer>
    </>
  );
}

export default DashboardLayout;
