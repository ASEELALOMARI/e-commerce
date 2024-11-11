import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function DashboardFooter() {
  return (
    <>
      <Box sx={{ backgroundColor: "#F5F5F7", padding: 4 }}>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography variant="caption">
              © {new Date().getFullYear()} Made with love by ASEEL. All rights reserved for D-Flow.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default DashboardFooter;
