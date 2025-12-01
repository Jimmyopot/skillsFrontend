
import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import GroupIcon from "@mui/icons-material/Group";
import Divider from "@mui/material/Divider";
// import Link from "next/link";
import backgroundPattern from "../../../assets/abstract-network-pattern-connecting-people.jpg";


export function HeroSection() {
  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 8,
        background:
          "linear-gradient(135deg, #f8fafc 0%, #e0e7ef 50%, #f8fafc 100%)",
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          // backgroundImage: "url()",
          backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
        <Box
          sx={{ maxWidth: 900, mx: "auto", textAlign: "center", px: 2, py: 10 }}
        >
          {/* Logo/Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 4,
            }}
          >
            <Box
              sx={{
                p: 1.5,
                bgcolor: "primary.main",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HandshakeIcon
                sx={{ color: "primary.contrastText", width: 32, height: 32 }}
              />
            </Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "text.primary" }}
            >
              NipeNikupe
            </Typography>
          </Box>

          {/* Main Headline */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 3,
              lineHeight: 1.1,
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            Trade your talent.{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              Find your match.
            </Box>{" "}
            <Box component="span" sx={{ color: "secondary.main" }}>
              Build your future.
            </Box>
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              mb: 4,
              maxWidth: 700,
              mx: "auto",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Connect with skilled individuals in your community. Exchange your
            expertise for the services you need. No money required—just talent,
            trust, and mutual growth.
          </Typography>

          {/* CTA Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              mb: 6,
            }}
          >
            <Button
              size="large"
              variant="contained"
              color="primary"
              sx={{
                fontSize: "1.125rem",
                px: 5,
                py: 2,
                fontWeight: 600,
                textTransform: "none",
              }}
              // component={Link}
              href="/register"
              endIcon={<ArrowRightAltIcon sx={{ ml: 1 }} />}
            >
              Get Started
            </Button>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              sx={{
                fontSize: "1.125rem",
                px: 5,
                py: 2,
                fontWeight: 600,
                textTransform: "none",
                bgcolor: "transparent",
              }}
              href="#how-it-works"
            >
              How It Works  
            </Button>
          </Box>

          {/* Social Proof */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              color: "text.secondary",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <GroupIcon sx={{ width: 20, height: 20 }} />
              <Typography variant="body2">5,000+ active members</Typography>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: "none", sm: "block" }, mx: 2, height: 24 }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HandshakeIcon sx={{ width: 20, height: 20 }} />
              <Typography variant="body2">
                10,000+ successful exchanges
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
