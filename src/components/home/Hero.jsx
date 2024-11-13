import React from "react";
import { Box, Typography, Button, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const HeroSection = styled(Box)(({ theme, bgImage }) => ({
  position: "relative",
  width: "100%",
  height: "80vh",
  backgroundImage: bgImage ? `url(${bgImage})` : "none",
  backgroundColor: bgImage ? "transparent" : "#e3e1db",
  backgroundSize: "cover",
  backgroundPosition: "left center",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  paddingRight: "5%",
}));

const TextContainer = styled(Box)({
  maxWidth: "40%",
  textAlign: "left",
  color: "var(--primary-main)",
  padding: "20px 30px",
  borderRadius: "8px",
  transition: "color 0.3s ease, transform 0.3s ease",
  "&:hover": {
    color: "var(--secondary-main)", // Changes text color for both title and subtitle on hover
    transform: "scale(1.03)", // Slight scaling effect for the entire box
  },
});

const HeroTitle = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "700",
  lineHeight: 1.3,
  color: "inherit", // Inherits color from TextContainer
  transition: "color 0.3s ease", // Smooth transition for color
  "@media (max-width: 768px)": {
    fontSize: "1.8rem",
  },
});

const HeroSubtitle = styled(Typography)({
  fontSize: "1.1rem",
  marginTop: "20px",
  color: "inherit", // Inherits color from TextContainer
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: "0",
    height: "2px",
    background: "var(--secondary-main)",
    transition: "width 0.3s",
    position: "absolute",
    bottom: -4,
    left: 0,
  },
  "&:hover::after": {
    width: "100%", // Creates an underline effect on hover
  },
});

const ShopButton = styled(Button)({
  marginTop: "20px",
  padding: "12px 24px",
  backgroundColor: "var(--primary-light)",
  color: "var(--primary-main)",
  fontWeight: "bold",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    backgroundColor: "var(--secondary-main)",
    color: "var(--primary-contrastText)",
    transform: "scale(1.1)", // Enhanced scaling effect
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)", // Adds a subtle shadow
  },
});

const Hero = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const bgImage = !isSmallScreen ? "src/assets/WebHeroImage.jpg" : null; // Adjust path as needed

  return (
    <HeroSection style={{ backgroundImage: bgImage ? `url(${bgImage})` : "none" }}>
      <TextContainer>
        <HeroTitle>Classy, Trendy, and Wrapped with Love</HeroTitle>
        <HeroSubtitle>
          Discover the Perfect Gift for Every Special Moment!
        </HeroSubtitle>
        <ShopButton variant="contained">Shop Now</ShopButton>
      </TextContainer>
    </HeroSection>
  );
};

export default Hero;
