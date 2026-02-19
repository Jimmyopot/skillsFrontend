import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import plumber from "../../../assets/plumber.png";
import engineers from "../../../assets/engineers.png";
import farmer from "../../../assets/farmer.png";
import teacher from "../../../assets/teacher.png";
import photographer from "../../../assets/photographer.png";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  const images = [farmer, engineers, plumber, photographer, teacher];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [imagesLoaded] = useState(true); // Show first image immediately

  const features = [
    { icon: "🤝", text: "Connect Instantly" },
    { icon: "💼", text: "Trade Skills, Not Cash" },
    { icon: "🌟", text: "Build Your Network" },
    { icon: "✅", text: "Trusted Community" },
    { icon: "⚡", text: "Find Matches Fast" },
  ];

  const handleClickStartMatching = () => {
    navigate("/signUp");
  };

  // Preload remaining images in background (first image loads immediately)
  useEffect(() => {
    // Skip the first image since it's already displaying
    const imagePromises = images.slice(1).map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve; // Resolve even on error to not block
      });
    });

    Promise.all(imagePromises); // Preload in background, no need to wait
  }, []);

  // Delay features display
  useEffect(() => {
    const featureTimer = setTimeout(() => {
      setShowFeatures(true);
    }, 800);

    return () => clearTimeout(featureTimer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setNextIndex(() => (currentIndex + 1) % images.length);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  return (
    <>
      <Box
        component="section"
        id="home"
        sx={{
          zIndex: 999,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #F0FCF0 0%, #D8F3DC 50%, #B7E4C7 100%)",
        }}
      >
        {/* Current Background Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: imagesLoaded ? `url(${images[currentIndex]})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: imagesLoaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
            zIndex: 0,
          }}
        />

        {/* Next Background Image (for smooth crossfade) */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: imagesLoaded ? `url(${images[nextIndex]})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: isTransitioning && imagesLoaded ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.35) 100%)",
            zIndex: 1,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100%",
          }}
        >
          <Box
            sx={{
              maxWidth: "900px",
              textAlign: "center",
              width: "100%",
              opacity: 0,
              animation: "fadeInContent 0.8s ease-in-out forwards",
              animationDelay: "0.3s",
              "@keyframes fadeInContent": {
                "0%": { opacity: 0, transform: "translateY(20px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "32px", md: "48px", lg: "56px" },
                fontWeight: "700",
                color: "#FFFFFF",
                lineHeight: "1.2",
                mb: 4,
                textAlign: "center",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Trade Your Talent. Find Your Match. Build Your Future.
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "16px", md: "18px", lg: "20px" },
                color: "#FFFFFF",
                lineHeight: "1.6",
                marginBottom: "32px",
                textAlign: "center",
                textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
              }}
            >
              Connect with skilled individuals in your community. Exchange your
              expertise for the services you need. No money required—just
              talent, trust, and mutual growth.
            </Typography>

            <Button
              variant="contained"
              onClick={handleClickStartMatching}
              sx={{
                background: "#FF9500",
                color: "#FFFFFF",
                padding: "12px 32px",
                textTransform: "none",
                fontSize: "16px",
                fontWeight: "600",
                borderRadius: "24px",
                boxShadow: "0 4px 14px 0 rgba(255, 149, 0, 0.39)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#E68600",
                  transform: "scale(1.05)",
                  boxShadow: "0 6px 20px 0 rgba(255, 149, 0, 0.5)",
                },
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%": {
                    boxShadow: "0 4px 14px 0 rgba(255, 149, 0, 0.39)",
                  },
                  "50%": {
                    boxShadow: "0 4px 20px 0 rgba(255, 149, 0, 0.6)",
                  },
                  "100%": {
                    boxShadow: "0 4px 14px 0 rgba(255, 149, 0, 0.39)",
                  },
                },
              }}
            >
              Get Started
            </Button>

            {/* Hero Features - Delayed Load with Fade In */}
            {showFeatures && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: "-80px", md: "-100px" },
                  left: 0,
                  right: 0,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  paddingX: { xs: "20px", md: "60px" },
                  opacity: 0,
                  animation: "fadeInFeatures 1s ease-in forwards",
                  "@keyframes fadeInFeatures": {
                    "0%": { opacity: 0, transform: "translateY(20px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                  },
                }}
              >
                <Box
                  sx={{
                    display: "inline-flex",
                    animation: "scrollLeft 20s linear infinite",
                    "@keyframes scrollLeft": {
                      "0%": { transform: "translateX(0%)" },
                      "100%": { transform: "translateX(-50%)" },
                    },
                  }}
                >
                  {[...features, ...features].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginRight: "40px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>{item.icon}</Typography>
                      </Box>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: { xs: "16px", md: "20px" },
                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
}
