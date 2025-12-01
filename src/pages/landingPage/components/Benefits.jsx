
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FlashOnIcon from "@mui/icons-material/FlashOn";

export function BenefitsSection() {
  const benefits = [
    {
      icon: (
        <SecurityOutlinedIcon sx={{ fontSize: 28, color: "primary.main" }} />
      ),
      title: "Verified Users",
      description:
        "All members go through our verification process to ensure safe and trustworthy exchanges.",
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28, color: "primary.main" }} />,
      title: "Flexible Scheduling",
      description:
        "Exchange skills on your own timeline. Set your availability and work when it suits you.",
    },
    {
      icon: (
        <LocationOnOutlinedIcon sx={{ fontSize: 28, color: "primary.main" }} />
      ),
      title: "Local Connections",
      description:
        "Connect with skilled individuals in your area for in-person collaborations and services.",
    },
    {
      icon: (
        <StarBorderOutlinedIcon sx={{ fontSize: 28, color: "primary.main" }} />
      ),
      title: "Quality Assurance",
      description:
        "Our rating system ensures high-quality exchanges and helps you find the best matches.",
    },
    {
      icon: (
        <PeopleAltOutlinedIcon sx={{ fontSize: 28, color: "primary.main" }} />
      ),
      title: "Growing Community",
      description:
        "Join thousands of professionals, creatives, and skilled individuals building together.",
    },
    {
      icon: <FlashOnIcon sx={{ fontSize: 28, color: "primary.main" }} />,
      title: "Instant Matching",
      description:
        "Our smart algorithm quickly connects you with people who need your skills and offer what you need.",
    },
  ];

  return (
    <Box
      component="section"
      id="benefits"
      sx={{ py: 10, bgcolor: "background.main" }}
    >
      <Box sx={{ maxWidth: 1400, mx: "auto", px: 2 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Why Choose NipeNikupe?
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", maxWidth: 700, mx: "auto" }}
          >
            Experience the benefits of a trusted community built on mutual
            growth and skill sharing.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
            maxWidth: 1000,
            mx: "auto",
          }}
        >
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              sx={{
                transition: "box-shadow 0.3s, transform 0.3s",
                border: 1,
                borderColor: "divider",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px)",
                },
                borderRadius: 3,
              }}
              elevation={0}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "primary.main2",
                      borderRadius: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                  >
                    {benefit.icon}
                  </Box>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {benefit.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", lineHeight: 1.7 }}
                >
                  {benefit.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
