import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import plumber from "../../../assets/plumber.png";
import engineers from "../../../assets/engineers.png";
// import doctor from "../../../assets/doctor.png";
import hairdresser from "../../../assets/hairdresser.png";
import photographer from "../../../assets/photographer.png";
import { Link, useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const professionImages = [
    {
      src: hairdresser,
      alt: "Doctor examining a patient",
    },
    {
      src: engineers,
      alt: "Engineers at work",
    },
    {
      src: plumber,
      alt: "Plumber fixing a sink",
    },
    {
      src: photographer,
      alt: "Photographer capturing a moment",
    },
  ];

  const goToSignUp = () => {
    navigate("/signUp");
  }

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % professionImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [professionImages.length]);

  // const nextImage = () => {
  //   setCurrentImageIndex((prev) => (prev + 1) % professionImages.length);
  // };

  // const prevImage = () => {
  //   setCurrentImageIndex(
  //     (prev) => (prev - 1 + professionImages.length) % professionImages.length
  //   );
  // };

  return (
    <Box
      component="section"
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        // background: "linear-gradient(135deg, var(--background), var(--muted))",
        backgroundColor: "background.main",
        pt: 8,
        px: { xs: 0, md: 8, lg: 12 },
        overflow: "hidden",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "100vw", px: 4, py: 10, mx: "auto" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 12,
            alignItems: "center",
            maxWidth: "112rem",
            mx: "auto",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* New Arrival Badge */}
            {/* <Box sx={{ display: "inline-block" }}>
              <Box
                sx={{
                  backgroundColor: "primary.main",
                  opacity: 0.1,
                  color: "primary.main",
                  px: 2,
                  py: 1,
                  borderRadius: 999,
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: 1,
                }}
              >
                NEW PLATFORM...
              </Box>
            </Box> */}

            {/* Main Headline */}
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: 40, md: 56, lg: 72 },
                  fontWeight: "bold",
                  lineHeight: 1.1,
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
            </Box>

            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: 18, md: 20 },
                color: "text.secondary",
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              Connect with skilled individuals in your community. Exchange your
              expertise for the services you need. No money required—just
              talent, trust, and mutual growth.
            </Typography>

            {/* CTA Buttons */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Button
                // component={Link}
                color="primary"
                // href="/register"
                size="large"
                variant="contained"
                sx={{
                  fontSize: 18,
                  px: 4,
                  py: 2,
                  textTransform: "none",
                  // backgroundColor: "primary.main",
                  // "&:hover": { backgroundColor: "primary.dark" },
                }}
                endIcon={<ArrowRightAltIcon sx={{ ml: 1, fontSize: 24 }} />}
                onClick={goToSignUp}
                // component={Link}
                // to="/signUp"
              >
                Get Started
              </Button>
              <Button
                component="a"
                href="#how-it-works"
                size="large"
                variant="outlined"
                color="secondary"
                sx={{
                  fontSize: 18,
                  px: 4,
                  py: 2,
                  textTransform: "none",
                  // backgroundColor: "transparent",
                }}
              >
                See How It Works
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              display: "flex",
              justifyContent: { xs: "center", lg: "flex-end" },
            }}
          >
            <Box sx={{ position: "relative" }}>
              {/* Main Image Container with Circular Background */}
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 320, md: 384 },
                  height: { xs: 320, md: 384 },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "primary.main",
                    opacity: 0.2,
                    borderRadius: "50%",
                    transform: "scale(1.15)",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    zIndex: 10,
                    width: "90%",
                    height: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 4,
                  }}
                >
                  <Box
                    component="img"
                    src={
                      professionImages[currentImageIndex].src ||
                      "/placeholder.svg"
                    }
                    alt={professionImages[currentImageIndex].alt}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 4,
                      boxShadow: 8,
                      transition: "all 0.5s ease-in-out",
                    }}
                  />
                </Box>
              </Box>

              {/* Vertical Navigation Dots */}
              {/* <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateX(48px) translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {professionImages.map((_, index) => (
                  <Box
                    key={index}
                    component="button"
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View ${professionImages[index].alt}`}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      transition: "all 0.3s",
                      backgroundColor:
                        index === currentImageIndex
                          ? "primary.main"
                          : "primary.main",
                      opacity: index === currentImageIndex ? 1 : 0.3,
                      transform:
                        index === currentImageIndex
                          ? "scale(1.25)"
                          : "scale(1)",
                      mb: 0.5,
                      border: "none",
                      cursor: "pointer",
                      "&:hover": { opacity: 0.5 },
                    }}
                  />
                ))}
              </Box> */}
              {/* Vertical Navigation Dots */}
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateX(48px) translateY(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {professionImages.map((_, index) => (
                  <Box
                    key={index}
                    component="button"
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`View ${professionImages[index].alt}`}
                    sx={{
                      width: 8, // smaller size
                      height: 8,
                      borderRadius: "50%", // perfectly round
                      transition: "all 0.3s",
                      backgroundColor: "primary.main",
                      opacity: index === currentImageIndex ? 1 : 0.3,
                      transform:
                        index === currentImageIndex ? "scale(1.4)" : "scale(1)",
                      border: "none",
                      cursor: "pointer",
                      p: 0, // remove extra button padding
                      "&:hover": { opacity: 0.6 },
                    }}
                  />
                ))}
              </Box>

              {/* Navigation Arrows */}
              {/* <Box
                component="button"
                onClick={prevImage}
                aria-label="Previous image"
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "25%",
                  transform: "translateX(48px) translateY(-50%)",
                  p: 1,
                  borderRadius: "50%",
                  backgroundColor: "background.paper",
                  boxShadow: 3,
                  "&:hover": { backgroundColor: "grey.100" },
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <KeyboardArrowUpIcon sx={{ fontSize: 20 }} />
              </Box>
              <Box
                component="button"
                onClick={nextImage}
                aria-label="Next image"
                sx={{
                  position: "absolute",
                  right: 0,
                  bottom: "25%",
                  transform: "translateX(48px) translateY(50%)",
                  p: 1,
                  borderRadius: "50%",
                  backgroundColor: "background.paper",
                  boxShadow: 3,
                  "&:hover": { backgroundColor: "grey.100" },
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <KeyboardArrowDownIcon sx={{ fontSize: 20 }} />
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
