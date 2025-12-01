import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import HandshakeIcon from "@mui/icons-material/Handshake";
import GroupIcon from "@mui/icons-material/Group";
import StarIcon from "@mui/icons-material/Star";
import carpenter from "../../../assets/carpenter.png";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Sarah",
    quote:
      "I traded my graphic design skills for home-cooked meals. Amazing community!",
  },
  {
    name: "Marcus",
    quote: "Fixed someone's plumbing in exchange for guitar lessons. Win-win!",
  },
  {
    name: "Elena",
    quote:
      "Teaching Spanish while learning web development. NipeNikupe made it possible.",
  },
  {
    name: "David",
    quote:
      "Exchanged my carpentry skills for tax preparation. No money needed!",
  },
];

const communityMembers = [
  {
    name: "Alex",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "Maria",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "James",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
  },
  {
    name: "Lisa",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
  },
];

export function ReadyToGetStarted() {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const goToSignUp = () => {
    navigate("/signUp");
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);


  return (
    <Box
      component="section"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        bgcolor: "background.paper",
        p: { xs: 2, lg: 6 },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: { xs: 4, lg: 8 },
          alignItems: "center",
        }}
      >
        {/* Left Side - Image with WhatsApp-style design */}
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "relative",
              bgcolor: "#fff",
              borderRadius: 6,
              boxShadow: 8,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={carpenter}
              alt="Construction worker"
              sx={{
                width: "100%",
                height: { xs: 350, lg: 500 },
                objectFit: "cover",
              }}
            />
            {/* <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  aspectRatio: "1",
                  bgcolor: "primary.light",
                  background:
                    "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                  borderRadius: 4,
                  overflow: "hidden", // ✅ ensures image doesn’t spill outside
                }}
              >
                <img
                  src={constructor}
                  alt="About NipeNikupe"
                  style={{
                    width: "100%",
                    height: "100%",
                    // objectFit: "cover", // ✅ fills the box proportionally
                    borderRadius: "inherit", // matches parent rounded corners
                  }}
                />
              </Box>
            </Box> */}

            {/* <Box sx={{ position: "absolute", top: 16, left: 16, right: 16 }}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(4px)",
                  borderRadius: 999,
                  px: 3,
                  py: 1.5,
                  boxShadow: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "success.main",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GroupIcon sx={{ color: "#fff", width: 18, height: 18 }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: 14, color: "grey.900" }}
                  >
                    Active Community
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: "grey.700" }}>
                    2,847 skill exchanges today
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "success.main",
                    borderRadius: "50%",
                    animation: "mui-pulse 1.2s infinite alternate",
                  }}
                />
              </Box>
            </Box> */}
          </Box>

          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex" }}>
              {communityMembers.map((member, index) => (
                <Avatar
                  key={index}
                  src={member.avatar}
                  alt={member.name}
                  sx={{
                    width: 40,
                    height: 40,
                    border: "2px solid #fff",
                    boxShadow: 1,
                    ml: index === 0 ? 0 : -1.5,
                  }}
                />
              ))}
            </Box>
            <Box>
              <Typography
                sx={{ fontWeight: 600, fontSize: 14, color: "grey.900" }}
              >
                Used by over{" "}
                <Box
                  component="span"
                  sx={{ color: "success.main", fontWeight: 700 }}
                >
                  50,000
                </Box>
              </Typography>
              <Typography sx={{ fontSize: 12, color: "grey.700" }}>
                skill traders worldwide
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side - Content */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Box sx={{ mb: 0 }}>
            <Typography
              sx={{
                color: "success.main",
                fontWeight: 600,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Build Community
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                color: "grey.900",
                mb: 1,
                mt: 1,
                lineHeight: 1.1,
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography sx={{ fontSize: 20, color: "grey.700", mb: 0 }}>
              Join a thriving community where your skills are your currency.
            </Typography>
          </Box>

          {/* Testimonial */}
          <Card
            sx={{
              bgcolor: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(4px)",
              border: 0,
              boxShadow: 6,
              p: 3,
              borderRadius: 4,
              transition: "all 0.5s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "success.main",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <StarIcon sx={{ width: 22, height: 22, color: "#fff" }} />
              </Box>
              <Typography sx={{ color: "grey.900", fontWeight: 600 }}>
                {testimonials[currentTestimonial].name}
              </Typography>
            </Box>
            <Typography
              sx={{ color: "grey.800", fontSize: 18, fontStyle: "italic" }}
            >
              "{testimonials[currentTestimonial].quote}"
            </Typography>
          </Card>

          {/* Supporting Text */}
          {/* <Typography sx={{ fontSize: 17, color: "grey.700", lineHeight: 1.7 }}>
            Whether you're a graphic designer, plumber, tutor, or
            chef—NipeNikupe connects you to people who value what you offer. No
            money, just meaningful exchange.
          </Typography> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Button
              size="large"
              sx={{
                bgcolor: "secondary.main",
                color: "background.paper",
                fontWeight: 600,
                px: 5,
                py: 2,
                fontSize: 18,
                borderRadius: 2,
                boxShadow: 3,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "secondary.main3",
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
                transition: "all 0.3s",
              }}
              onClick={goToSignUp}
              startIcon={<HandshakeIcon sx={{ width: 22, height: 22 }} />}
            >
              Join NipeNikupe
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                color: "grey.800",
                fontWeight: 600,
                px: 5,
                py: 2,
                fontSize: 18,
                borderRadius: 999,
                borderColor: "grey.300",
                "&:hover": { color: "grey.900", borderColor: "grey.500" },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
