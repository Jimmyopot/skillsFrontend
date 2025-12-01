import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Refresh, Wifi, WifiOff, SignalWifiOff, Router } from '@mui/icons-material';
import { useState, useEffect } from 'react';

export default function NoInternetPage() {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Simulate retry delay
    setTimeout(() => {
      setIsRetrying(false);
      // Reload the page to check connection
      window.location.reload();
    }, 2000);
  };

  // Add some interactivity - random tips
  const troubleshootingTips = [
    "Check if your WiFi is turned on 📶",
    "Try restarting your router 🔄", 
    "Check your ethernet cable connection 🔌",
    "Move closer to your WiFi router 📡",
    "Contact your internet service provider 📞"
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % troubleshootingTips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [troubleshootingTips.length]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #a29bfe 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating Elements Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <WifiOff
            key={i}
            sx={{
              position: 'absolute',
              color: 'rgba(255, 255, 255, 0.1)',
              fontSize: `${Math.random() * 3 + 2}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float 6s ease-in-out infinite ${i * 0.5}s`,
              '@keyframes float': {
                '0%, 100%': {
                  transform: 'translateY(0px) rotate(0deg)',
                },
                '50%': {
                  transform: 'translateY(-20px) rotate(10deg)',
                },
              },
            }}
          />
        ))}
      </Box>

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={20}
          sx={{
            textAlign: 'center',
            padding: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Animated Disconnected Icon */}
          <Box
            sx={{
              mb: 3,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {/* Router/Modem illustration */}
            <Box
              sx={{
                width: 120,
                height: 80,
                backgroundColor: '#2d3436',
                borderRadius: 2,
                position: 'relative',
                mb: 2,
                mx: 'auto',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  right: 10,
                  height: 8,
                  backgroundColor: '#00b894',
                  borderRadius: 1,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 25,
                  left: 10,
                  right: 10,
                  height: 8,
                  backgroundColor: '#e17055',
                  borderRadius: 1,
                },
              }}
            >
              {/* Antenna */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -15,
                  left: 20,
                  width: 3,
                  height: 20,
                  backgroundColor: '#636e72',
                  borderRadius: 1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: -15,
                  right: 20,
                  width: 3,
                  height: 20,
                  backgroundColor: '#636e72',
                  borderRadius: 1,
                }}
              />
              
              {/* Ethernet ports */}
              {[...Array(4)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: 15 + i * 20,
                    width: 12,
                    height: 8,
                    backgroundColor: '#74b9ff',
                    borderRadius: 0.5,
                  }}
                />
              ))}
            </Box>

            {/* Disconnected WiFi Signal */}
            <SignalWifiOff
              sx={{
                fontSize: '4rem',
                color: '#e17055',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    transform: 'scale(1)',
                    opacity: 0.7,
                  },
                  '50%': {
                    transform: 'scale(1.1)',
                    opacity: 1,
                  },
                },
              }}
            />

            {/* Broken connection line */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 100,
                height: 2,
                backgroundColor: '#e17055',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -8,
                  right: 10,
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '8px solid #e17055',
                  transform: 'rotate(45deg)',
                },
              }}
            />
          </Box>

          {/* Main Message */}
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#2d3436',
              fontSize: { xs: '2rem', md: '3rem' },
              animation: 'slideUp 0.6s ease-out',
              '@keyframes slideUp': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(30px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0px)',
                },
              },
            }}
          >
            Oops! No Internet Connection
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: '#636e72',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              animation: 'slideUp 0.6s ease-out 0.2s both',
            }}
          >
            It looks like your internet connection is taking a coffee break ☕️
            <br />
            Don't worry, we'll help you get back online!
          </Typography>

          {/* Connection Status */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: '#fab1a0',
              color: '#2d3436',
              borderRadius: 2,
              maxWidth: '500px',
              mx: 'auto',
              animation: 'slideUp 0.6s ease-out 0.4s both',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <WifiOff sx={{ mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Connection Status: Offline
              </Typography>
            </Box>
            <Typography variant="body2">
              We can't reach our servers right now. Please check your internet connection.
            </Typography>
          </Box>

          {/* Rotating Tips */}
          <Box
            sx={{
              mb: 4,
              p: 2,
              backgroundColor: '#81ecec',
              color: '#00363a',
              borderRadius: 2,
              maxWidth: '400px',
              mx: 'auto',
              minHeight: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'slideUp 0.6s ease-out 0.6s both',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              💡 <strong>Tip:</strong> {troubleshootingTips[currentTip]}
            </Typography>
          </Box>

          {/* Retry Button */}
          <Button
            onClick={handleRetry}
            disabled={isRetrying}
            variant="contained"
            size="large"
            startIcon={
              isRetrying ? (
                <Refresh
                  sx={{
                    animation: 'spin 1s linear infinite',
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
              ) : (
                <Refresh />
              )
            }
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 3,
              textTransform: 'none',
              backgroundColor: '#00b894',
              boxShadow: 4,
              animation: 'slideUp 0.6s ease-out 0.8s both',
              '&:hover': {
                backgroundColor: '#00a085',
                transform: 'translateY(-2px)',
                boxShadow: 6,
              },
              '&:disabled': {
                backgroundColor: '#b2dfdb',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isRetrying ? 'Checking Connection...' : 'Try Again'}
          </Button>

          {/* Additional Help */}
          <Box
            sx={{
              mt: 4,
              pt: 3,
              borderTop: '1px solid #ddd',
              animation: 'slideUp 0.6s ease-out 1s both',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#636e72',
                mb: 2,
              }}
            >
              Still having trouble? Here are some quick fixes:
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center',
              }}
            >
              {[
                { icon: <Router />, text: 'Restart Router' },
                { icon: <Wifi />, text: 'Check WiFi' },
                { icon: '📱', text: 'Try Mobile Data' },
              ].map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 2,
                    py: 1,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    fontSize: '0.9rem',
                    color: '#495057',
                  }}
                >
                  {typeof item.icon === 'string' ? (
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  ) : (
                    item.icon
                  )}
                  <Typography variant="body2">{item.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Footer Message */}
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: '#95a5a6',
              fontStyle: 'italic',
              animation: 'slideUp 0.6s ease-out 1.2s both',
            }}
          >
            We'll be here when you get back online! 🌐✨
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}