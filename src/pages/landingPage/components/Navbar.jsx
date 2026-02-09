import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { clearAuthObj } from "../../login/state/authSlice.js";
import { useDispatch } from "react-redux";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "About Us", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
];

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const goToSignUp = () => {
    navigate("/signUp");
  };

  const goToLogin = () => {
    dispatch(clearAuthObj());
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById("landing-container");
      const scrollPosition = container ? container.scrollTop : window.scrollY;

      if (scrollPosition > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const container = document.getElementById("landing-container");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <AppBar
      elevation={0}
      position="fixed"
      sx={{
        backgroundColor: isScrolled ? "#FFFFFF" : "transparent",
        boxShadow: isScrolled ? "0px 4px 10px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
        borderBottom: isScrolled ? 1 : 0,
        borderColor: isScrolled ? "divider" : "transparent",
        padding: isScrolled ? "0px 40px" : "20px 40px",
      }}
    >
      <Toolbar
        sx={{ minHeight: 64, display: "flex", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            cursor: "pointer",
          }}
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById("home");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Box
            sx={{
              p: 1,
              bgcolor: "primary.main",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HandshakeIcon
              sx={{ color: "primary.contrastText", width: 24, height: 24 }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: isScrolled ? "text.primary" : "#FFFFFF",
              transition: "color 0.3s ease",
            }}
          >
            NipeNikupe
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 4,
          }}
        >
          {navLinks.map((link) => (
            <Button
              key={link.href}
              onClick={(e) => {
                e.preventDefault();
                const id = link.href.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              sx={{
                color: isScrolled ? "text.primary" : "#FFFFFF",
                textTransform: "none",
                fontWeight: 500,
                transition: "color 0.3s ease",
                "&:hover": { color: "primary.main" },
              }}
              variant="text"
            >
              {link.label}
            </Button>
          ))}

          {/* {navLinks.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              sx={{
                color: "text.primary",
                textTransform: "none",
                fontWeight: 500,
                "&:hover": { color: "primary.main" },
              }}
              variant="text"
            >
              {link.label}
            </Button>
          ))} */}
        </Box>

        {/* CTA Button */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              color: isScrolled ? "text.primary" : "#FFFFFF",
              borderColor: isScrolled ? "secondary.main" : "#FFFFFF",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: isScrolled
                  ? "rgba(0, 0, 0, 0.04)"
                  : "rgba(255, 255, 255, 0.1)",
                borderColor: isScrolled ? "secondary.dark" : "#FFFFFF",
              },
            }}
            onClick={goToLogin}
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ textTransform: "none", fontWeight: 600, ml: 2 }}
            onClick={goToSignUp}
          >
            Get Started
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <IconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <CloseIcon
                sx={{
                  color: isScrolled ? "text.primary" : "#FFFFFF",
                  width: 28,
                  height: 28,
                  transition: "color 0.3s ease",
                }}
              />
            ) : (
              <MenuIcon
                sx={{
                  color: isScrolled ? "text.primary" : "#FFFFFF",
                  width: 28,
                  height: 28,
                  transition: "color 0.3s ease",
                }}
              />
            )}
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="top"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{ display: { md: "none" } }}
        PaperProps={{
          sx: {
            pt: 8,
            pb: 2,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          },
        }}
      >
        <List>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    sx: { color: "text.primary", fontWeight: 500 },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 1, textTransform: "none", fontWeight: 600 }}
            >
              Get Started
            </Button>
          </ListItem>
          <ListItem>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 1, textTransform: "none", fontWeight: 600 }}
            >
              Login
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
