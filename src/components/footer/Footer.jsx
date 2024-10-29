import React from "react";
import { Box, Grid, Typography, TextField, Button, IconButton } from "@mui/material";
import { Instagram, YouTube } from "@mui/icons-material";
import { FaTiktok, FaSnapchatGhost, FaCcPaypal, FaCcVisa , FaMoneyBillAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {MdPayments} from "react-icons/md";
import NewsletterFooter from "./NewsletterFooter";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F5F7", padding: 4 }}>
      <Grid container spacing={2} justifyContent="space-between">
        
        {/* Social Media Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="body1" gutterBottom>
            FIND US ON
          </Typography>
          <Box>
            <IconButton color="black" aria-label="Instagram">
              <Instagram />
            </IconButton>
            <IconButton color="black" aria-label="TikTok">
              <FaTiktok />
            </IconButton>
            <IconButton color="black" aria-label="Snapchat">
              <FaSnapchatGhost />
            </IconButton>
            <IconButton color="black" aria-label="YouTube">
              <YouTube />
            </IconButton>
            <IconButton color="black" aria-label="Twitter">
              <FaXTwitter />
            </IconButton>
          </Box>
        </Grid>

        {/* Newsletter Subscription Section */}
        <Grid item xs={12} md={4}>
          <NewsletterFooter/>
        </Grid>

        {/* Payment Methods Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="body1" gutterBottom>
            WE ACCEPT
          </Typography>
          <Box>
            <IconButton color="black" aria-label="Paypal">
              <FaCcPaypal  />
            </IconButton>
            <IconButton color="black" aria-label="Cash">
              <FaMoneyBillAlt />
            </IconButton>
            <IconButton color="black" aria-label="Visa">
              <FaCcVisa />
            </IconButton>
            <IconButton color="black" aria-label="Mada">
              <MdPayments />
            </IconButton>
          </Box>
        </Grid>

        {/* Copyright Section */}
        <Grid item xs={12} textAlign="center" sx={{ marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary">
            ©2020-{new Date().getFullYear()} MY STORE. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
