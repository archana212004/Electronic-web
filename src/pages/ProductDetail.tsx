import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Rating,
} from '@mui/material';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
    date: string;
  }>;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Rating value={product.rating} readOnly precision={0.5} />
              <Typography variant="body2" color="text.secondary">
                ({product.reviews.length} reviews)
              </Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Category: {product.category}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Stock: {product.stock} units
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3 }}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 