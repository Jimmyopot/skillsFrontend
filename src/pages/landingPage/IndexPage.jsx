import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorks';
import { BenefitsSection } from './components/Benefits';
import { AboutSection } from './components/About';
import { TestimonialsSection } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ReadyToGetStarted } from './components/ReadyToGetStarted';
import { useLocation } from 'react-router-dom';

const IndexPage = () => {
  const location = useLocation();
  const active = location.state?.section || "home";
  // const navigate = useNavigate();

  useEffect(() => {
    const container = document.getElementById("landing-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [active]);

  return (
    <Box id="landing-container" sx={{ height: "100vh", overflowY: "auto" }}>
      <Navbar />

      <Box sx={{ pt: 0, height: "auto" }} id="home">
        <HeroSection />
      </Box>

      <HowItWorksSection />
      <BenefitsSection />
      <AboutSection />
      <TestimonialsSection />
      <ReadyToGetStarted />
      <Footer />
    </Box>
  );
}

export default IndexPage;
