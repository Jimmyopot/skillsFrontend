import { Box } from '@mui/material';
import React from 'react'
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorks';
import { BenefitsSection } from './components/Benefits';
import { AboutSection } from './components/About';
import { TestimonialsSection } from './components/Testimonials';
import { Footer } from './components/Footer';
import { ReadyToGetStarted } from './components/ReadyToGetStarted';

const IndexPage = () => {
  return (
    <Box>
      <Navbar />
      <HeroSection />
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
