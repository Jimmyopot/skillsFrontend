
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  LocationOn
} from '@mui/icons-material';

export default function AnalyticsDashboard() {
  const theme = useTheme();
  const topSkills = [
    { skill: "Web Development", searches: 342, matches: 28, demand: "High" },
    { skill: "Graphic Design", searches: 298, matches: 15, demand: "High" },
    { skill: "Photography", searches: 267, matches: 8, demand: "Medium" },
    { skill: "Plumbing", searches: 245, matches: 3, demand: "High" },
    { skill: "Carpentry", searches: 198, matches: 5, demand: "Medium" },
    { skill: "Electrician", searches: 176, matches: 2, demand: "High" },
    { skill: "Cooking", searches: 154, matches: 12, demand: "Low" },
    { skill: "Tutoring", searches: 142, matches: 18, demand: "Medium" },
    { skill: "Fitness Training", searches: 128, matches: 7, demand: "Low" },
    { skill: "Accounting", searches: 115, matches: 4, demand: "Medium" },
  ];

  const topCounties = [
    { county: "Nairobi", searches: 1245, users: 342, trades: 89 },
    { county: "Mombasa", searches: 456, users: 128, trades: 34 },
    { county: "Kisumu", searches: 234, users: 67, trades: 18 },
    { county: "Nakuru", searches: 198, users: 54, trades: 12 },
    { county: "Eldoret", searches: 167, users: 45, trades: 9 },
  ];

  const opportunityZones = topSkills.filter(
    (s) => s.searches > 200 && s.matches < 10
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, bgcolor: '#f0f9f0', p: 2 }}>
      {/* Key Metrics */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2
        }}
      >
        <Card 
          elevation={2}
          sx={{
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8]
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Total Searches
              </Typography>
              <Assessment sx={{ color: '#2e7d32', fontSize: 24 }} />
            </Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              4,521
            </Typography>
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500 }}>
              +18% from last week
            </Typography>
          </CardContent>
        </Card>
        
        <Card 
          elevation={2}
          sx={{
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8]
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Active Trades
              </Typography>
              <TrendingUp sx={{ color: '#2e7d32', fontSize: 24 }} />
            </Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              234
            </Typography>
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500 }}>
              +12% from last week
            </Typography>
          </CardContent>
        </Card>
        
        <Card 
          elevation={2}
          sx={{
            transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8]
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Opportunity Zones
              </Typography>
              <LocationOn sx={{ color: '#ff9800', fontSize: 24 }} />
            </Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              {opportunityZones.length}
            </Typography>
            <Typography variant="body2" sx={{ color: '#ff9800', fontWeight: 500 }}>
              High demand, low supply
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Top 10 Skills */}
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
            Top 10 Most Searched Skills
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#e8f5e8' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Skill
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Searches
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Matches
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Demand Level
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topSkills.map((item, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(46, 125, 50, 0.05)',
                      },
                      borderBottom: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <TableCell sx={{ py: 2, fontWeight: 500, color: 'text.primary' }}>
                      {item.skill}
                    </TableCell>
                    <TableCell sx={{ py: 2, color: 'text.primary' }}>
                      {item.searches}
                    </TableCell>
                    <TableCell sx={{ py: 2, color: 'text.primary' }}>
                      {item.matches}
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Chip
                        label={item.demand}
                        size="small"
                        sx={{
                          bgcolor: item.demand === "High" 
                            ? '#ffebee' 
                            : item.demand === "Medium" 
                            ? '#fff3e0' 
                            : '#e8f5e8',
                          color: item.demand === "High"
                            ? '#c62828'
                            : item.demand === "Medium"
                            ? '#ef6c00'
                            : '#2e7d32',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Top Counties */}
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
            Top Searched Counties
          </Typography>
          <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: '#e8f5e8' }}>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    County
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Searches
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Users
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>
                    Active Trades
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topCounties.map((item, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(46, 125, 50, 0.05)',
                      },
                      borderBottom: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <TableCell sx={{ py: 2, fontWeight: 500, color: 'text.primary' }}>
                      {item.county}
                    </TableCell>
                    <TableCell sx={{ py: 2, color: 'text.primary' }}>
                      {item.searches}
                    </TableCell>
                    <TableCell sx={{ py: 2, color: 'text.primary' }}>
                      {item.users}
                    </TableCell>
                    <TableCell sx={{ py: 2, color: 'text.primary' }}>
                      {item.trades}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Opportunity Zones */}
      <Card elevation={2}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
            Opportunity Zones (High Demand, Low Supply)
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 2
            }}
          >
            {opportunityZones.map((zone, idx) => (
              <Paper
                key={idx}
                elevation={1}
                sx={{
                  p: 2,
                  border: '1px solid #ffcc02',
                  bgcolor: '#fff8e1',
                  borderRadius: 2,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  }
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
                  {zone.skill}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {zone.searches} searches, only {zone.matches} matches
                </Typography>
                <Typography variant="body2" sx={{ color: '#ef6c00', fontWeight: 500 }}>
                  Gap: {zone.searches - zone.matches * 10} potential users
                </Typography>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
