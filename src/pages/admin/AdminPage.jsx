import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Paper,
  useTheme,
  AppBar,
  Toolbar
} from '@mui/material';
import { 
  Dashboard, 
  People, 
  Analytics, 
  Lightbulb, 
  MonetizationOn,
  Settings,
  Home,
  TrendingUp,
  Email,
  Assessment,
  Notifications
} from '@mui/icons-material';
// Component imports removed - using placeholder content for now
import UserManagementPanel from "./components/UserManagementPanel";
import AnalyticsDashboard from "./components/AnalyticsDashboard";  
import SkillSuggestionsPanel from "./components/SkillSuggestionsPanel";
import MonetizationFeatures from "./components/MonetizationFeatures";
import { theme } from "../../theme";

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    // { id: "overview", label: "Overview", icon: <Dashboard /> },
    // { id: "users", label: "User Management", icon: <People /> },
    // { id: "analytics", label: "Analytics", icon: <Analytics /> },
    // {
    //   id: "skills",
    //   label: "Skill Suggestions",
    //   icon: <Lightbulb />,
    // },
    // {
    //   id: "monetization",
    //   label: "Monetization",
    //   icon: <MonetizationOn />,
    // },

    { id: "overview", label: "Overview", icon: <span>📊</span> },
    { id: "user", label: "User Management", icon: <span>👥</span> },
    { id: "analytics", label: "Analytics", icon: <span>📈</span> },
    { id: "skills", label: "Skill Suggestions", icon: <span>💡</span> },
    { id: "monetization", label: "Monetization", icon: <span>💰</span> },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f0f9f0" }}>
      {/* Admin Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#e8f5e8",
          color: "text.primary",
          borderBottom: "none",
        }}
      >
        <Toolbar>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: { xs: 2, sm: 3 },
              pt: 4,
              pb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  bgcolor: "#2e7d32",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Settings sx={{ color: "white", fontSize: 24 }} />
              </Paper>
              <Box>
                <Typography
                  variant="h5"
                  component="h1"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  Admin Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage platform, users, and monetization
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Home />}
              onClick={() => navigate("/")}
              sx={{
                borderColor: "#2e7d32",
                color: "#2e7d32",
                borderRadius: 25,
                px: 3,
                "&:hover": {
                  bgcolor: "#2e7d32",
                  color: "white",
                },
              }}
            >
              Back to Home
            </Button>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Tab Navigation */}
      <Box
        sx={{
          position: "sticky",
          top: 64,
          zIndex: 30,
          bgcolor: "#e8f5e8",
          py: 2,
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3 } }}>
          {/* <Box sx={{ display: "flex", gap: 3, overflowX: "auto", pb: 1 }}>
            {tabs.map((tab, index) => (
              <Button
                key={tab.id}
                variant={activeTab === index ? "contained" : "outlined"}
                startIcon={tab.icon}
                onClick={() => setActiveTab(index)}
                sx={{
                  minWidth: "max-content",
                  px: 3,
                  py: 1,
                  borderRadius: 25,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  ...(activeTab === index
                    ? {
                        bgcolor: "#2e7d32",
                        color: "white",
                        "&:hover": {
                          bgcolor: "#1b5e20",
                        },
                      }
                    : {
                        borderColor: "#2e7d32",
                        color: "#2e7d32",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "rgba(46, 125, 50, 0.1)",
                        },
                      }),
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box> */}
          <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 1 }}>
            {tabs.map((tab, index) => (
              <Button
                key={tab.id}
                variant={activeTab === index ? "contained" : "text"}
                startIcon={tab.icon}
                onClick={() => setActiveTab(index)}
                sx={{
                  minWidth: "max-content",
                  px: 2.5,
                  py: 1,
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  whiteSpace: "nowrap",
                  ...(activeTab === index
                    ? {
                        bgcolor: theme.palette.primary.main,
                        color: "white",
                        "&:hover": {
                          bgcolor: theme.palette.primary.main,
                        },
                      }
                    : {
                        color: "",
                        bgcolor: "transparent",
                        "&:hover": {
                          bgcolor: "",
                        },
                      }),
                }}
              >
                {tab.label}
              </Button>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Content Area */}
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2, sm: 3 }, py: 4, bgcolor: "#f0f9f0" }}
      >
        {activeTab === 0 && <OverviewTab />}
        {activeTab === 1 && (
          <Box sx={{ textAlign: "center", pt: 0, pb: 8 }}>
            <UserManagementPanel />
          </Box>
        )}
        {activeTab === 2 && (
          <Box sx={{ textAlign: "center", pt: 0, pb: 8 }}>
            <AnalyticsDashboard />
          </Box>
        )}
        {activeTab === 3 && (
          <Box sx={{ textAlign: "center", pt: 0, pb: 8 }}>
            <SkillSuggestionsPanel />
          </Box>
        )}
        {activeTab === 4 && (
          <Box sx={{ textAlign: "center", pt: 0, pb: 8 }}>
            <MonetizationFeatures />
          </Box>
        )}
      </Container>
    </Box>
  );
}

function OverviewTab() {
  const theme = useTheme();
  const stats = [
    { label: "Total Users", value: "1,234", change: "+12%", icon: <People sx={{ fontSize: 40, color: 'primary.main' }} /> },
    { label: "Active Trades", value: "456", change: "+8%", icon: <TrendingUp sx={{ fontSize: 40, color: 'secondary.main' }} /> },
    { label: "Skills Listed", value: "2,891", change: "+23%", icon: <Lightbulb sx={{ fontSize: 40, color: 'warning.main' }} /> },
    { label: "Revenue (MTD)", value: "$12,450", change: "+45%", icon: <MonetizationOn sx={{ fontSize: 40, color: 'success.main' }} /> },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          gap: 3
        }}
      >
        {stats.map((stat, idx) => (
          <Card 
            key={idx}
            elevation={2}
            sx={{ 
              height: '100%',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8]
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" component="p" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                    {stat.change} from last month
                  </Typography>
                </Box>
                <Box>
                  {stat.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
            Quick Actions
          </Typography>
          <Box 
            sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2
            }}
          >
            <Button
              variant="contained"
              fullWidth
              startIcon={<Email />}
              sx={{
                height: 48,
                bgcolor: '#2e7d32',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#1b5e20',
                },
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Send Platform Announcement
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Assessment />}
              sx={{
                height: 48,
                bgcolor: '#2e7d32',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#1b5e20',
                },
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Export Analytics Report
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Notifications />}
              sx={{
                height: 48,
                bgcolor: '#2e7d32',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#1b5e20',
                },
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Review Pending Listings
            </Button>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Settings />}
              sx={{
                height: 48,
                bgcolor: '#2e7d32',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#1b5e20',
                },
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              System Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
