import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowBack, Search } from '@mui/icons-material';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={10}
          sx={{
            textAlign: 'center',
            padding: { xs: 4, md: 6 },
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          {/* 404 Animation */}
          <Box
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
              mb: 2,
              animation: 'pulse 2s ease-in-out infinite alternate',
              '@keyframes pulse': {
                '0%': {
                  transform: 'scale(1)',
                  opacity: 0.8,
                },
                '100%': {
                  transform: 'scale(1.05)',
                  opacity: 1,
                },
              },
            }}
          >
            404
          </Box>

          {/* Search Icon with Animation */}
          <Box
            sx={{
              mb: 3,
              animation: 'bounce 1s ease-in-out infinite',
              '@keyframes bounce': {
                '0%, 20%, 50%, 80%, 100%': {
                  transform: 'translateY(0)',
                },
                '40%': {
                  transform: 'translateY(-10px)',
                },
                '60%': {
                  transform: 'translateY(-5px)',
                },
              },
            }}
          >
            <Search
              sx={{
                fontSize: '4rem',
                color: 'primary.main',
                opacity: 0.7,
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
              color: 'text.primary',
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Oops! Page Not Found
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            The page you're looking for seems to have wandered off into the digital wilderness. 
            Don't worry, even the best explorers sometimes take a wrong turn! 🧭
          </Typography>

          {/* Fun Facts */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              maxWidth: '500px',
              mx: 'auto',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              💡 <strong>Did you know?</strong> The first 404 error was discovered at CERN in 1992. 
              You're now part of internet history!
            </Typography>
          </Box>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              maxWidth: '400px',
              mx: 'auto',
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
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: 3,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 6,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go Home
            </Button>
            
            <Button
              onClick={handleGoBack}
              variant="outlined"
              size="large"
              startIcon={<ArrowBack />}
              sx={{
                flex: 1,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderWidth: 2,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go Back
            </Button>
          </Box>

          {/* Footer Message */}
          <Typography
            variant="body2"
            sx={{
              mt: 4,
              color: 'text.secondary',
              fontStyle: 'italic',
            }}
          >
            Lost? No worries! Every great journey has a few detours. ✨
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}