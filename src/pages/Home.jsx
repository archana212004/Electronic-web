import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Home() {
  const featuredProducts = [
    {
      id: 1,
      name: 'Latest Smartphone',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      description: 'Experience the future with our latest smartphone',
      price: 999.99
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      description: 'Premium sound quality with active noise cancellation',
      price: 199.99
    },
    {
      id: 3,
      name: 'Smart Watch',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      description: 'Stay connected and track your fitness',
      price: 299.99
    }
  ];

  return (
    <>
      <Box className="hero-section">
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Electronics Store
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Discover the latest electronic gadgets and accessories
          </Typography>
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            size="large"
            sx={{ mt: 4, backgroundColor: 'white', color: 'primary.main', '&:hover': { backgroundColor: '#f0f0f0' } }}
          >
            Browse Products
          </Button>
        </Container>
      </Box>

      <Container>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card className="product-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h3">
                    {product.name}
                  </Typography>
                  <Typography color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/products/${product.id}`}
                    variant="outlined"
                    sx={{ mt: 2 }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Why Choose Us?
          </Typography>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Free Shipping
              </Typography>
              <Typography color="text.secondary">
                On orders over $50
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                24/7 Support
              </Typography>
              <Typography color="text.secondary">
                Always here to help
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="h6" gutterBottom>
                Money Back Guarantee
              </Typography>
              <Typography color="text.secondary">
                30-day return policy
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Home; 