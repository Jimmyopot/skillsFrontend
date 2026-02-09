import React, { useState } from "react";
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

  const goToSignUp = () => {
    navigate("/signUp");
  };

  const goToLogin = () => {
    dispatch(clearAuthObj());
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "background.main",
        backdropFilter: "blur(8px)",
        borderBottom: 1,
        borderColor: "divider",
        boxShadow: 0,
      }}
    >
      <Toolbar
        sx={{ minHeight: 64, display: "flex", justifyContent: "space-between" }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
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
            sx={{ fontWeight: "bold", color: "text.primary" }}
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
                e.preventDefault(); // prevent default anchor behavior
                const id = link.href.replace("#", ""); // remove '#' to get the id
                const element = document.getElementById(id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
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
            color="secondary"
            sx={{ textTransform: "none", fontWeight: 600 }}
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
                sx={{ color: "text.primary", width: 28, height: 28 }}
              />
            ) : (
              <MenuIcon sx={{ color: "text.primary", width: 28, height: 28 }} />
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
