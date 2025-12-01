
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import SearchIcon from "@mui/icons-material/Search";
import HandshakeIcon from "@mui/icons-material/Handshake";

export function HowItWorksSection() {
  const steps = [
    {
      icon: <PersonAddAltIcon sx={{ fontSize: 32, color: 'secondary.main' }} />,
      title: "List Your Skills",
      description:
        "Create your profile and showcase the talents you can offer to the community.",
      step: "01",
    },
    {
      icon: <SearchIcon sx={{ fontSize: 32, color: 'secondary.main' }} />,
      title: "Request Skills",
      description:
        "Browse available skills or post what you need. Our matching system connects you with the right people.",
      step: "02",
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 32, color: 'secondary.main' }} />,
      title: "Match & Exchange",
      description:
        "Connect with your match, agree on terms, and start exchanging skills that benefit both parties.",
      step: "03",
    },
  ];

  return (
    <Box
      component="section"
      id="how-it-works"
      sx={{ py: 10, bgcolor: "background.paper" }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            How It Works
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}
          >
            Getting started with skill exchange is simple. Follow these three
            easy steps to begin building your network.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          {steps.map((step, index) => (
            <Card
              key={index}
              sx={{
                position: "relative",
                border: 2,
                borderColor: "divider",
                transition: "border-color 0.2s",
                "&:hover": { borderColor: "primary.main" },
                borderRadius: 3,
                overflow: "visible", // ✅ prevents clipping
              }}
              elevation={0}
            >
              <CardContent
                sx={{
                  p: 5,
                  textAlign: "center",
                  minHeight: 300,
                  position: "relative",
                }}
              >
                {/* Step Number (now inside card, above icon) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 999,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "#158003", // green
                      color: "#fff",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: 18,
                      border: "3px solid #fff",
                      boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                      zIndex: 999,
                    }}
                  >
                    {step.step}
                  </Box>
                </Box>

                {/* Icon */}
                <Box sx={{ mb: 3, mt: 3 }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: "secondary.main2",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                    }}
                  >
                    {step.icon}
                  </Box>
                </Box>

                {/* Content */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  {step.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
