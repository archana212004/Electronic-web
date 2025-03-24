import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
  Divider,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Simulated product data (replace with actual API call)
const PRODUCTS = [
  {
    _id: '1',
    name: 'Latest Smartphone',
    description: 'Experience the future with our latest smartphone model. Features include:\n- 6.7-inch OLED display\n- Triple camera system with 108MP main sensor\n- 5G connectivity with ultra-low latency\n- All-day battery life with 5000mAh capacity\n- 256GB storage with expandable memory\n- AI-powered features and optimization',
    price: 999.99,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 10,
    rating: 4.5,
    reviews: 128
  },
  {
    _id: '2',
    name: 'Wireless Earbuds',
    description: 'Premium sound quality with advanced features:\n- Active noise cancellation\n- 24-hour battery life with charging case\n- Touch controls for easy operation\n- IPX7 water resistance\n- Bluetooth 5.2 connectivity\n- Built-in voice assistant support',
    price: 199.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.3,
    reviews: 95
  },
  {
    _id: '3',
    name: 'Smart Watch',
    description: 'Stay connected and healthy with features:\n- Advanced health monitoring\n- ECG and blood oxygen tracking\n- Sleep analysis and stress monitoring\n- GPS and fitness tracking\n- 5-day battery life\n- Water resistant to 50m',
    price: 299.99,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 8,
    rating: 4.6,
    reviews: 156
  },
  {
    _id: '4',
    name: 'Gaming Laptop',
    description: 'Ultimate gaming performance with:\n- NVIDIA RTX 4080 16GB GPU\n- Intel Core i9 13th Gen processor\n- 32GB DDR5 RAM\n- 1TB NVMe SSD\n- 17.3" QHD 240Hz display\n- RGB mechanical keyboard',
    price: 1999.99,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 5,
    rating: 4.8,
    reviews: 72
  },
  {
    _id: '5',
    name: '4K Smart TV',
    description: 'Immersive entertainment experience:\n- 65-inch OLED 4K display\n- HDR10+ and Dolby Vision\n- 120Hz refresh rate\n- Smart TV features with voice control\n- HDMI 2.1 for gaming\n- Built-in streaming apps',
    price: 1499.99,
    category: 'TV & Home',
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 3,
    rating: 4.7,
    reviews: 89
  },
  {
    _id: '6',
    name: 'Wireless Gaming Mouse',
    description: 'Professional gaming performance:\n- 25K DPI optical sensor\n- Ultra-low latency wireless\n- 70-hour battery life\n- 8 programmable buttons\n- RGB lighting\n- Lightweight design at 63g',
    price: 79.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.4,
    reviews: 245
  },
  {
    _id: '7',
    name: 'Professional Camera',
    description: 'Professional photography and videography:\n- Full-frame 45MP sensor\n- 8K video recording\n- 5-axis stabilization\n- Dual card slots\n- Weather-sealed body\n- Advanced AF system',
    price: 2499.99,
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 7,
    rating: 4.9,
    reviews: 67
  },
  {
    _id: '8',
    name: 'Smart Home Hub',
    description: 'Complete home automation:\n- Voice control support\n- Compatible with major smart devices\n- Energy monitoring\n- Custom automation routines\n- Security features\n- Multi-room audio control',
    price: 129.99,
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 12,
    rating: 4.2,
    reviews: 183
  },
  {
    _id: '9',
    name: 'Mechanical Keyboard',
    description: 'Premium typing experience:\n- Hot-swappable switches\n- RGB per-key backlighting\n- Aluminum construction\n- PBT keycaps\n- USB-C connection\n- Programmable macros',
    price: 149.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.6,
    reviews: 142
  },
  {
    _id: '10',
    name: 'Portable SSD',
    description: 'High-speed portable storage:\n- 2TB capacity\n- Up to 2000MB/s transfer speed\n- USB-C connectivity\n- Shock resistant\n- Password protection\n- Compact design',
    price: 229.99,
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.5,
    reviews: 98
  }
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product] = useState(() => PRODUCTS.find(p => p._id === id));
  const [quantity, setQuantity] = useState(1);
  const [loading] = useState(false);
  const [error] = useState(null);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="warning">
          Product not found.
          <Button color="primary" onClick={() => navigate('/products')} sx={{ ml: 2 }}>
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <Container sx={{ py: 8 }}>
      <Button color="primary" onClick={() => navigate('/products')} sx={{ mb: 4 }}>
        ← Back to Products
      </Button>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews} reviews)
              </Typography>
            </Box>
            
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price.toFixed(2)}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {product.description.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Stock: {product.stock} units
              </Typography>
              
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1, max: product.stock }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                </Grid>
              </Grid>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="body2" color="text.secondary">
              Category: {product.category}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default ProductDetail; 