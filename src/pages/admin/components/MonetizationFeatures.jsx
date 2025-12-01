import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import {
  MonetizationOn,
  TrendingUp,
  People
} from '@mui/icons-material';

export default function MonetizationFeatures() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("promoted")

  const promotedListings = [
    {
      id: 1,
      user: "John Doe",
      skill: "Web Development",
      tier: "Premium",
      price: "$9.99/month",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
    },
    {
      id: 2,
      user: "Jane Smith",
      skill: "Graphic Design",
      tier: "Standard",
      price: "$4.99/month",
      status: "pending",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
    },
  ]

  const pricingTiers = [
    {
      name: "Standard",
      price: "$4.99",
      duration: "per month",
      features: ["Top search results", "Profile badge", "Email notifications"],
    },
    {
      name: "Premium",
      price: "$9.99",
      duration: "per month",
      features: ["Top search results", "Profile badge", "Email notifications", "Featured section"],
    },
    {
      name: "Elite",
      price: "$19.99",
      duration: "per month",
      features: ["Top search results", "Profile badge", "Email notifications", "Featured section", "Priority support"],
    },
  ]

  const revenue = [
    { month: "January", promoted: 1240, premium: 3450, sponsored: 2100, total: 6790 },
    { month: "February", promoted: 1890, premium: 4200, sponsored: 2800, total: 8890 },
    { month: "March", promoted: 2340, premium: 5100, sponsored: 3200, total: 10640 },
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, bgcolor: '#f0f9f0', p: 2 }}>
      {/* Revenue Overview */}
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
                Monthly Revenue
              </Typography>
              <MonetizationOn sx={{ color: '#2e7d32', fontSize: 24 }} />
            </Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              $10,640
            </Typography>
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500 }}>
              +20% from last month
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
                Active Promotions
              </Typography>
              <TrendingUp sx={{ color: '#1976d2', fontSize: 24 }} />
            </Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              47
            </Typography>
            <Typography variant="body2" sx={{ color: '#1976d2', fontWeight: 500 }}>
              12 pending approval
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
                Premium Users
              </Typography>
              <People sx={{ color: '#2e7d32', fontSize: 24 }} />
            </Box>
            <Typography variant="h3" component="p" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              156
            </Typography>
            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 500 }}>
              +8% from last month
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Tabs */}
      <Paper 
        elevation={0}
        sx={{
          bgcolor: 'transparent',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Tabs 
          value={activeTab}
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'text.secondary',
              '&.Mui-selected': {
                color: '#2e7d32',
                fontWeight: 600,
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#2e7d32',
              height: 3,
              borderRadius: '3px 3px 0 0'
            }
          }}
        >
          <Tab value="promoted" label="Promoted Listings" />
          <Tab value="pricing" label="Pricing Tiers" />
          <Tab value="revenue" label="Revenue Analytics" />
        </Tabs>
      </Paper>

      {/* Promoted Listings */}
      {activeTab === "promoted" && (
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
              Promoted Listings
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#e8f5e8' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>User</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Skill</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Tier</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Price</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {promotedListings.map((listing) => (
                    <TableRow
                      key={listing.id}
                      sx={{
                        '&:hover': {
                          bgcolor: 'rgba(46, 125, 50, 0.05)',
                        },
                        borderBottom: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <TableCell sx={{ py: 2, color: 'text.primary' }}>{listing.user}</TableCell>
                      <TableCell sx={{ py: 2, color: 'text.primary' }}>{listing.skill}</TableCell>
                      <TableCell sx={{ py: 2, color: 'text.primary' }}>{listing.tier}</TableCell>
                      <TableCell sx={{ py: 2, color: 'text.primary' }}>{listing.price}</TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Chip
                          label={listing.status}
                          size="small"
                          sx={{
                            bgcolor: listing.status === "active" ? '#e8f5e8' : '#fff3e0',
                            color: listing.status === "active" ? '#2e7d32' : '#ef6c00',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          {listing.status === "pending" && (
                            <>
                              <Button 
                                size="small" 
                                variant="outlined"
                                sx={{
                                  fontSize: '0.75rem',
                                  minWidth: 60,
                                  height: 28,
                                  borderColor: '#2e7d32',
                                  color: '#2e7d32',
                                  '&:hover': {
                                    bgcolor: '#2e7d32',
                                    color: 'white'
                                  }
                                }}
                              >
                                Approve
                              </Button>
                              <Button 
                                size="small" 
                                variant="outlined"
                                sx={{
                                  fontSize: '0.75rem',
                                  minWidth: 60,
                                  height: 28,
                                  borderColor: '#d32f2f',
                                  color: '#d32f2f',
                                  '&:hover': {
                                    bgcolor: '#d32f2f',
                                    color: 'white'
                                  }
                                }}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          {listing.status === "active" && (
                            <Button 
                              size="small" 
                              variant="outlined"
                              sx={{
                                fontSize: '0.75rem',
                                minWidth: 60,
                                height: 28,
                                borderColor: '#2e7d32',
                                color: '#2e7d32',
                                '&:hover': {
                                  bgcolor: '#2e7d32',
                                  color: 'white'
                                }
                              }}
                            >
                              Extend
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {/* Pricing Tiers */}
      {activeTab === "pricing" && (
        <Box sx={{ mb: 3 }}>
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
                Pricing Tiers Configuration
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                {pricingTiers.map((tier, idx) => (
                  <Card key={idx} variant="outlined" sx={{ p: 2, borderColor: '#e0e0e0', borderRadius: 2 }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Typography variant="h6" component="p" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
                        {tier.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                        <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                          {tier.price}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', ml: 0.5 }}>
                          /{tier.duration}
                        </Typography>
                      </Box>
                      <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mb: 2 }}>
                        {tier.features.map((feature, fidx) => (
                          <Box component="li" key={fidx} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                              ✓
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                              {feature}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                      <Button 
                        fullWidth 
                        variant="contained"
                        sx={{
                          mt: 2,
                          bgcolor: '#2e7d32',
                          color: 'white',
                          '&:hover': {
                            bgcolor: '#1b5e20'
                          }
                        }}
                      >
                        Edit Tier
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Revenue Analytics */}
      {activeTab === "revenue" && (
        <Card elevation={2}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 3 }}>
              Revenue Analytics
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ bgcolor: 'transparent' }}>
              <Table size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: '#e8f5e8' }}>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Month</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Promoted</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Premium Insights</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Sponsored</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: 'text.primary', py: 2 }}>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {revenue.map((row, idx) => (
                    <TableRow
                      key={idx}
                      sx={{
                        '&:hover': {
                          bgcolor: 'rgba(46, 125, 50, 0.05)',
                        },
                        borderBottom: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <TableCell sx={{ py: 2, color: 'text.primary', fontWeight: 500 }}>{row.month}</TableCell>
                      <TableCell sx={{ py: 2, color: 'text.primary' }}>${row.promoted}</TableCell>
                      <TableCell sx={{ py: 2, color: 'text.primary' }}>${row.premium}</TableCell>
                      <TableCell sx={{ py: 2, color: 'text.primary' }}>${row.sponsored}</TableCell>
                      <TableCell sx={{ py: 2, color: '#2e7d32', fontWeight: 600 }}>${row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  )
}

