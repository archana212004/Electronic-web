import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box className="footer">
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="inherit">
              We are dedicated to providing the latest and greatest electronic devices
              and accessories at competitive prices. Our commitment is to ensure
              100% customer satisfaction.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box>
              <Link component={RouterLink} to="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Home
              </Link>
              <Link component={RouterLink} to="/products" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Products
              </Link>
              <Link component={RouterLink} to="/cart" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Cart
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" sx={{ display: 'block' }}>
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect With Us
            </Typography>
            <Box>
              <IconButton color="inherit" component="a" href="https://facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" component="a" href="https://linkedin.com" target="_blank">
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Subscribe to our newsletter for updates and exclusive offers!
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mt: 4, pt: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Electronics Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer; 