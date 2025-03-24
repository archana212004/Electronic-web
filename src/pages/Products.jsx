import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  TextField,
  Box,
  MenuItem,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Expanded product data with more electronics
const PRODUCTS = [
  {
    _id: '1',
    name: 'Latest Smartphone',
    description: 'Experience the future with our latest smartphone model featuring 5G connectivity and AI capabilities',
    price: 74999,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 10
  },
  {
    _id: '2',
    name: 'Wireless Earbuds',
    description: 'Premium sound quality with active noise cancellation and 24-hour battery life',
    price: 14999,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 15
  },
  {
    _id: '3',
    name: 'Smart Watch',
    description: 'Stay connected and track your fitness with advanced health monitoring features',
    price: 24999,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 8
  },
  {
    _id: '4',
    name: 'Gaming Laptop',
    description: 'Ultimate gaming performance with RTX 4080, 32GB RAM, and 1TB SSD',
    price: 149999,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 5
  },
  {
    _id: '5',
    name: '4K Smart TV',
    description: '65-inch OLED display with HDR and smart features for ultimate entertainment',
    price: 89999,
    category: 'TV & Home',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 3
  },
  {
    _id: '6',
    name: 'Wireless Gaming Mouse',
    description: '25K DPI sensor with ultra-low latency for competitive gaming',
    price: 5999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 20
  },
  {
    _id: '7',
    name: 'Professional Camera',
    description: 'Full-frame mirrorless camera with 8K video recording capability',
    price: 199999,
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 7
  },
  {
    _id: '8',
    name: 'Smart Home Hub',
    description: 'Control your entire home with voice commands and automation',
    price: 9999,
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 12
  },
  {
    _id: '9',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with hot-swappable switches',
    price: 11999,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 15
  },
  {
    _id: '10',
    name: 'Portable SSD',
    description: '2TB external SSD with USB-C and transfer speeds up to 2000MB/s',
    price: 17999,
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 25
  }
];

const categories = ['All', 'Phones', 'Audio', 'Wearables', 'Computers', 'TV & Home', 'Accessories', 'Cameras', 'Smart Home', 'Storage'];

// Helper function to format price in Indian Rupees
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom component="h1" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
          Our Products
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Search products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              sx={{ bgcolor: 'background.paper' }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              variant="outlined"
              sx={{ bgcolor: 'background.paper' }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: 3,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                  {formatPrice(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {product.stock} units
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/products/${product._id}`)}
                  sx={{ mr: 1 }}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No Products Found Message */}
      {filteredProducts.length === 0 && (
        <Alert severity="info" sx={{ mt: 4 }}>
          No products found matching your criteria.
        </Alert>
      )}
    </Container>
  );
}

export default Products; 