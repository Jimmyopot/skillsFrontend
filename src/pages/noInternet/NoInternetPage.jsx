/* eslint-disable react-hooks/purity */
import { Box, Typography, Button, Paper, useTheme } from '@mui/material';
import { Refresh, Wifi, WifiOff, PowerOff } from '@mui/icons-material';
import { useState, useEffect } from "react";

export default function NoInternetPage() {
  const theme = useTheme();
  const [isRetrying, setIsRetrying] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const troubleshootingTips = [
    "Check if your WiFi is turned on 📶",
    "Try restarting your router 🔄",
    "Check your ethernet cable connection 🔌",
    "Move closer to your WiFi router 📡",
    "Contact your internet service provider 📞",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % troubleshootingTips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      window.location.reload();
    }, 2000);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        bgcolor: theme.palette.primary.main2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        '& .animate-float': {
          animation: 'float 6s ease-in-out infinite',
        },
        '& .animate-wiggle': {
          animation: 'wiggle 2s ease-in-out infinite',
        },
        '& .animate-slide-up': {
          animation: 'slide-up 0.6s ease-out both',
        },
        '& .animate-fade-wave': {
          animation: 'fade-wave 2s ease-in-out infinite',
        },
        '& .animate-pulse-slow': {
          animation: 'pulse-slow 1.5s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-30px) rotate(15deg)',
          },
        },
        '@keyframes wiggle': {
          '0%, 100%': {
            transform: 'translateY(-50%) rotate(0deg)',
          },
          '25%': {
            transform: 'translateY(-50%) rotate(-8deg)',
          },
          '75%': {
            transform: 'translateY(-50%) rotate(8deg)',
          },
        },
        '@keyframes slide-up': {
          '0%': {
            opacity: 0,
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
        '@keyframes fade-wave': {
          '0%, 100%': {
            opacity: 0.2,
            transform: 'rotate(45deg) scale(1)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'rotate(45deg) scale(1.05)',
          },
        },
        '@keyframes pulse-slow': {
          '0%, 100%': {
            transform: 'scale(1)',
          },
          '50%': {
            transform: 'scale(1.15)',
          },
        },
      }}
    >
      {/* Floating Background Icons */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {[...Array(8)].map((_, i) => (
          <WifiOff
            key={i}
            className="animate-float"
            sx={{
              position: 'absolute',
              color: 'white',
              opacity: 0.1,
              fontSize: Math.random() * 60 + 40,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '6s',
            }}
          />
        ))}
      </Box>

      <Paper
        elevation={8}
        sx={{
          maxWidth: 672,
          width: '100%',
          borderRadius: 6,
          p: { xs: 4, md: 6 },
          position: 'relative',
          zIndex: 10,
          background: theme.palette.background.paper,
        }}
      >
        {/* Disconnect Switch Illustration */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Switch Container */}
          <Box
            sx={{
              width: 192,
              height: 130,
              background: `linear-gradient(to bottom, ${theme.palette.grey[50]}, ${theme.palette.grey[100]})`,
              borderRadius: 4,
              boxShadow: 3,
              border: `4px solid ${theme.palette.grey[300]}`,
              position: 'relative',
              mb: 3,
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 48,
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
              }
            }}
          >
            {/* LED Indicators */}
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 2,
                zIndex: 10,
              }}
            >
              {["PWR", "WiFi", "WAN"].map((label, idx) => (
                <Box key={label} sx={{ textAlign: 'center' }}>
                  <Box
                    className={idx === 0 ? "animate-pulse-slow" : ""}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: theme.palette.error.main,
                      mb: 0.5,
                      boxShadow: `0 0 12px ${theme.palette.error.main}60`,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: 10,
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Toggle Switch */}
            <Box
              sx={{
                position: 'absolute',
                top: 64,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 144,
                height: 48,
                background: theme.palette.error.light,
                borderRadius: 25,
                border: `4px solid ${theme.palette.error.main}`,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {/* Handle in OFF position */}
              <Box
                className="animate-wiggle"
                sx={{
                  position: 'absolute',
                  left: 4,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 36,
                  height: 36,
                  bgcolor: 'white',
                  borderRadius: '50%',
                  boxShadow: 2,
                  border: `4px solid ${theme.palette.error.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PowerOff
                  sx={{
                    color: theme.palette.error.main,
                    fontSize: 18,
                  }}
                />
              </Box>
              {/* OFF Label */}
              <Typography
                variant="body2"
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: theme.palette.error.dark,
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              >
                OFF
              </Typography>
            </Box>
          </Box>

          
        </Box>

        {/* Main Content */}
        <Box className="animate-slide-up" sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <WifiOff
              sx={{
                color: theme.palette.error.main,
                fontSize: 28,
                mr: 1.5,
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
              }}
            >
              No Internet Connection
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              maxWidth: 480,
              mx: 'auto',
            }}
          >
            It looks like you're not connected to the internet. Check your connection and try again.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleRetry}
            disabled={isRetrying}
            startIcon={
              <Refresh
                sx={{
                  animation: isRetrying ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(0deg)',
                    },
                    '100%': {
                      transform: 'rotate(360deg)',
                    },
                  },
                }}
              />
            }
            sx={{
              px: 4,
              py: 1.5,
              fontSize: 16,
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            {isRetrying ? "Retrying..." : "Try Again"}
          </Button>
        </Box>

        {/* Troubleshooting Tips */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            background: theme.palette.background.default,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: theme.palette.text.primary,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            💡 Troubleshooting Tips
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              Current tip:
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 500,
                p: 2,
                bgcolor: theme.palette.primary.light + '20',
                borderRadius: 2,
                border: `1px solid ${theme.palette.primary.light}`,
              }}
            >
              {troubleshootingTips[currentTip]}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[
              { icon: <Wifi sx={{ fontSize: 24 }} />, text: "Check WiFi" },
              { icon: <Refresh sx={{ fontSize: 24 }} />, text: "Restart Router" },
              { icon: <PowerOff sx={{ fontSize: 24 }} />, text: "Check Power" },
            ].map((tip, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  bgcolor: theme.palette.background.paper,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                  minWidth: 120,
                }}
              >
                <Box sx={{ color: theme.palette.primary.main }}>
                  {tip.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: 12,
                  }}
                >
                  {tip.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
}