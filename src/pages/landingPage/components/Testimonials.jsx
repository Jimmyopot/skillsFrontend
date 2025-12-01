
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Graphic Designer",
      image: "/professional-woman-smiling.png",
      content:
        "I exchanged my design skills for web development help. The experience was seamless and I learned so much from my match!",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Marketing Consultant",
      image: "/professional-man-smiling.png",
      content:
        "NipeNikupe helped me find a photographer for my business in exchange for marketing strategy. Both of us got exactly what we needed.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Language Teacher",
      image: "/professional-woman-teacher.png",
      content:
        "Teaching Spanish in exchange for coding lessons has been incredible. The community here is supportive and professional.",
      rating: 5,
    },
  ];


  return (
    <Box
      component="section"
      id="testimonials"
      sx={{ py: 10, bgcolor: "background.main" }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            What Our Community Says
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", maxWidth: 700, mx: "auto" }}
          >
            Real stories from real people who have transformed their skills into
            valuable connections.
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
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              sx={{ position: "relative", borderRadius: 3, overflow: "visible", }}
              elevation={0}
            >
              <CardContent sx={{ p: 4, position: "relative" }}>
                {/* Quote Icon */}
                <Box
                  sx={{ position: "absolute", top: -18, left: 24, zIndex: 2 }}
                >
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormatQuoteIcon
                      sx={{ color: "primary.contrastText", fontSize: 18 }}
                    />
                  </Box>
                </Box>

                {/* Rating */}
                <Box sx={{ display: "flex", gap: 0.5, mb: 2, mt: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      sx={{ fontSize: 18, color: "secondary.main" }}
                    />
                  ))}
                </Box>

                {/* Content */}
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 3,
                    fontStyle: "italic",
                    lineHeight: 1.7,
                  }}
                >
                  "{testimonial.content}"
                </Typography>

                {/* Author */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    component="img"
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
