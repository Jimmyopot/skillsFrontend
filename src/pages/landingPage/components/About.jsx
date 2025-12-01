
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import GroupIcon from "@mui/icons-material/Group";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import delivery from "../../../assets/delivery.png";
import { useNavigate } from "react-router-dom";

export function AboutSection() {
  const navigate = useNavigate();

  const goToSignUp = () => {
    navigate("/signUp");
  };
  return (
    <Box
      component="section"
      id="about"
      sx={{ py: 10, bgcolor: "background.main" }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            About{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              NipeNikupe
            </Box>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            We believe everyone has valuable skills to share. Our platform was
            born from the simple idea that communities thrive when people help
            each other grow through meaningful exchanges.
          </Typography>
        </Box>

        {/* Story Section */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 6,
            alignItems: "center",
            mb: 10,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", mb: 3, color: "text.primary" }}
            >
              Our Story
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 2, lineHeight: 1.7 }}
            >
              Founded in 2025, NipeNikupe started when our founders realized
              that traditional hiring and service platforms often create
              barriers between talented individuals and those who need their
              skills.
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mb: 3, lineHeight: 1.7 }}
            >
              We envisioned a world where a graphic designer could trade their
              expertise for cooking lessons, where a programmer could exchange
              coding tutorials for language practice, and where communities
              could flourish through mutual support.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={goToSignUp}
              sx={{ fontWeight: 600, textTransform: "none" }}
            >
              Join Our Community
            </Button>
          </Box>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                aspectRatio: "1",
                bgcolor: "primary.light",
                background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                borderRadius: 4,
                overflow: "hidden", // ✅ ensures image doesn’t spill outside
              }}
            >
              <img
                src={delivery}
                alt="About NipeNikupe"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // ✅ fills the box proportionally
                  borderRadius: "inherit", // matches parent rounded corners
                }}
              />
            </Box>
          </Box>

          {/* <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                aspectRatio: "1",
                bgcolor: "primary.light",
                background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={chef}
                alt="About NipeNikupe"
                style={{ width: "80%", height: "80%", objectFit: "contain" }}
              />
              <Box sx={{ textAlign: "center" }}>
                <GroupIcon
                  sx={{ fontSize: 96, color: "primary.main", mb: 2 }}
                />
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  5,000+
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Community Members
                </Typography>
              </Box>
            </Box>
          </Box> */}
        </Box>

        {/* Values Section */}
        <Box sx={{ mb: 10 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              mb: 5,
              color: "text.primary",
            }}
          >
            Our Values
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "1fr 1fr",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 3,
              }}
              elevation={0}
            >
              <CardContent sx={{ pt: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "primary.main2",
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FavoriteBorderOutlinedIcon
                    sx={{ fontSize: 32, color: "primary.main" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                >
                  Community First
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  We prioritize building genuine connections and fostering a
                  supportive environment for all members.
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 3,
              }}
              elevation={0}
            >
              <CardContent sx={{ pt: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "primary.main2",
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SecurityOutlinedIcon
                    sx={{ fontSize: 32, color: "primary.main" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                >
                  Trust & Safety
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Every member is verified, and we maintain strict standards to
                  ensure safe, reliable exchanges.
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 3,
              }}
              elevation={0}
            >
              <CardContent sx={{ pt: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "primary.main2",
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FlashOnIcon sx={{ fontSize: 32, color: "primary.main" }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                >
                  Innovation
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  We continuously improve our platform to make skill sharing
                  more accessible and rewarding.
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                textAlign: "center",
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 3,
              }}
              elevation={0}
            >
              <CardContent sx={{ pt: 3 }}>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: "primary.main2",
                    borderRadius: "50%",
                    width: 56,
                    height: 56,
                    mx: "auto",
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PeopleAltOutlinedIcon
                    sx={{ fontSize: 32, color: "primary.main" }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
                >
                  Inclusivity
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Everyone has something valuable to offer. We celebrate
                  diversity in skills, backgrounds, and experiences.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Mission Statement */}
        <Box
          sx={{
            textAlign: "center",
            bgcolor: "primary.main2",
            borderRadius: 4,
            p: { xs: 4, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", mb: 3, color: "text.primary" }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: 900,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            To create a world where everyone can access the skills they need and
            share their talents meaningfully, building stronger communities
            through the power of mutual exchange and collaboration.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
