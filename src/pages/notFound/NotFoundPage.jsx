import { Box, Typography, Button, Container, Paper, Fade, Divider, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, Search, Help } from '@mui/icons-material';
import { useEffect, useState } from "react";

export default function NotFoundPage() {
    const theme = useTheme();
  const navigate = useNavigate();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsAnimated(true);
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleExploreDashboard = () => {
    navigate('/signUp');
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        bgcolor: theme.palette.primary.main2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: { xs: 2, md: 6 },
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            textAlign: "center",
            padding: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Animated Illustration */}
          <Fade
            in={isAnimated}
            timeout={1000}
            style={{ transitionDelay: isAnimated ? "0ms" : "0ms" }}
          >
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 180, md: 200 },
                  height: { xs: 180, md: 200 },
                  mx: "auto",
                  mb: 4,
                }}
              >
                {/* Compass/Lost Icon Animation */}
                <Box
                  component="svg"
                  sx={{
                    width: "100%",
                    height: "100%",
                    animation: "bounce 2s ease-in-out infinite",
                    "@keyframes bounce": {
                      "0%, 20%, 50%, 80%, 100%": {
                        transform: "translateY(0)",
                      },
                      "40%": {
                        transform: "translateY(-10px)",
                      },
                      "60%": {
                        transform: "translateY(-5px)",
                      },
                    },
                  }}
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Circle */}
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Compass Points */}
                  <text
                    x="100"
                    y="30"
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#10b981"
                  >
                    N
                  </text>
                  <text
                    x="170"
                    y="105"
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#10b981"
                  >
                    E
                  </text>
                  <text
                    x="100"
                    y="175"
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#10b981"
                  >
                    S
                  </text>
                  <text
                    x="30"
                    y="105"
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill="#10b981"
                  >
                    W
                  </text>

                  {/* Center Circle */}
                  <circle cx="100" cy="100" r="15" fill="#10b981" />

                  {/* Spinning Needle */}
                  <g
                    sx={{
                      animation: "spin 3s linear infinite",
                      transformOrigin: "100px 100px",
                      "@keyframes spin": {
                        "0%": {
                          transform: "rotate(0deg)",
                        },
                        "100%": {
                          transform: "rotate(360deg)",
                        },
                      },
                    }}
                  >
                    <line
                      x1="100"
                      y1="100"
                      x2="100"
                      y2="50"
                      stroke="#ef4444"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* Question Mark */}
                  <text
                    x="100"
                    y="145"
                    textAnchor="middle"
                    fontSize="32"
                    fontWeight="bold"
                    fill="#f59e0b"
                  >
                    ?
                  </text>
                </Box>
              </Box>
            </Box>
          </Fade>

          {/* Error Code */}
          <Fade
            in={isAnimated}
            timeout={1000}
            style={{ transitionDelay: isAnimated ? "200ms" : "0ms" }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "6rem", md: "8rem" },
                  fontWeight: "bold",
                  color: "text.primary",
                  mb: 1,
                  background: "linear-gradient(45deg, #10b981, #059669)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                }}
              >
                404
              </Typography>
              <Box
                sx={{
                  height: 4,
                  width: 96,
                  background: "linear-gradient(to right, #10b981, #059669)",
                  mx: "auto",
                  borderRadius: 2,
                }}
              />
            </Box>
          </Fade>

          {/* Main Message */}
          <Fade
            in={isAnimated}
            timeout={1000}
            style={{ transitionDelay: isAnimated ? "300ms" : "0ms" }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: "bold",
                  color: "text.primary",
                  mb: 2,
                }}
              >
                Oops! Page Not Found
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "text.secondary",
                  maxWidth: "500px",
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Looks like you took a wrong turn on your skill-sharing journey.
                Don't worry—let's get you back on track!
              </Typography>
            </Box>
          </Fade>

          {/* CTA Buttons */}
          <Fade
            in={isAnimated}
            timeout={1000}
            style={{ transitionDelay: isAnimated ? "400ms" : "0ms" }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexDirection: { xs: "column", sm: "row" },
                maxWidth: "400px",
                mx: "auto",
                mb: 6,
              }}
            >
              <Button
                onClick={handleGoHome}
                variant="contained"
                size="large"
                startIcon={<Home />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: "none",
                  backgroundColor: "#10b981",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#059669",
                    transform: "translateY(-2px)",
                    boxShadow: 6,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Go Home
              </Button>

              <Button
                onClick={handleExploreDashboard}
                variant="outlined"
                size="large"
                startIcon={<Search />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  borderRadius: 3,
                  textTransform: "none",
                  borderColor: "#10b981",
                  color: "#10b981",
                  borderWidth: 2,
                  "&:hover": {
                    backgroundColor: "rgba(16, 185, 129, 0.04)",
                    transform: "translateY(-2px)",
                    borderWidth: 2,
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Explore Skills
              </Button>
            </Box>
          </Fade>

          {/* Helpful Text */}
          <Fade
            in={isAnimated}
            timeout={1000}
            style={{ transitionDelay: isAnimated ? "500ms" : "0ms" }}
          >
            <Box>
              <Divider sx={{ mb: 3 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 2,
                }}
              >
                Need help? Contact our support team
              </Typography>
              <Button
                variant="text"
                endIcon={<Help />}
                sx={{
                  color: "#10b981",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgba(16, 185, 129, 0.04)",
                  },
                }}
              >
                Get Support
              </Button>
            </Box>
          </Fade>
        </Paper>
      </Container>
    </Box>
  );
}
