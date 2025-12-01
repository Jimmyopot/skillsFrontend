
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import HandshakeIcon from "@mui/icons-material/Handshake";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import PlaceIcon from "@mui/icons-material/Place";


export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.100', py: 8 }}>
      <Box sx={{ maxWidth: 1400, mx: 'auto', px: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 6 }}>
          {/* Brand */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={{ p: 1, bgcolor: 'primary.main', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HandshakeIcon sx={{ color: 'primary.contrastText', width: 28, height: 28 }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'grey.100' }}>NipeNikupe</Typography>
            </Box>
            <Typography sx={{ color: 'grey.300', lineHeight: 1.7 }}>
              Connecting talented individuals through the power of skill exchange. Build your future, one trade at a time.
            </Typography>
          </Box>

          {/* Quick Links */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Quick Links</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, color: 'grey.300' }}>
              {['How It Works', 'Browse Skills', 'Success Stories', 'Help Center'].map((text) => (
                <Box component="li" key={text} sx={{ mb: 1 }}>
                  <Link href="#" underline="hover" sx={{ color: 'grey.300', '&:hover': { color: 'grey.100' }, transition: 'color 0.2s' }}>{text}</Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Community */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Community</Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, color: 'grey.300' }}>
              {['Guidelines', 'Safety Tips', 'Blog', 'Events'].map((text) => (
                <Box component="li" key={text} sx={{ mb: 1 }}>
                  <Link href="#" underline="hover" sx={{ color: 'grey.300', '&:hover': { color: 'grey.100' }, transition: 'color 0.2s' }}>{text}</Link>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Get in Touch</Typography>
            <Box sx={{ color: 'grey.300' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <MailIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">hello@nipenikupe.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PhoneIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">+1 (555) 123-4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PlaceIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">Nairobi, KE</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'grey.800', mt: 8, mb: 4 }} />
        <Box sx={{ textAlign: 'center', color: 'grey.500', fontSize: 14 }}>
          <Typography>
            &copy; 2025 NipeNikupe. All rights reserved. | Privacy Policy | Terms of Service
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
