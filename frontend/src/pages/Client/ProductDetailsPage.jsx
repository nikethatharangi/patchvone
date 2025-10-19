import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from "@mui/material";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Mock product data (normally fetched via API)
  const products = [
    {
      id: "1",
      name: "Classic Cotton Shorts",
      price: 3200,
      prevPrice: 4000,
      quantity: 5,
      images: [
        "https://images.unsplash.com/photo-1600180758890-6d8301c3617d?w=400",
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400",
        "https://images.unsplash.com/photo-1618354691324-6f3e1a9b29b2?w=400",
        "https://images.unsplash.com/photo-1629425733761-f7f4a7bb0d52?w=400",
      ],
      description: "High quality cotton shorts perfect for summer.",
      sizes: ["S", "M", "L", "XL"],
    },
    // Add other products similarly
  ];

  const product = products.find((p) => p.id === productId);

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return <Typography>Product not found.</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, mt: 2 }}>
      {/* Breadcrumb */}
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, cursor: "pointer", color: "primary.main" }}
        onClick={() => navigate(-1)}
      >
        &lt; Back
      </Typography>

      <Grid container spacing={4}>
        {/* Left: Image gallery */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={selectedImage}
              alt={product.name}
              sx={{ objectFit: "cover" }}
            />

            {/* Thumbnails */}
            <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
              {product.images.map((img, idx) => (
                <Box
                  key={idx}
                  component="img"
                  src={img}
                  alt={`thumb-${idx}`}
                  onClick={() => setSelectedImage(img)}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 1,
                    cursor: "pointer",
                    border: selectedImage === img ? "2px solid #aa9d75" : "1px solid #ccc",
                    objectFit: "cover",
                    "&:hover": { opacity: 0.8 },
                  }}
                />
              ))}
            </Box>

            {product.quantity === 0 && (
              <Chip
                label="Sold Out"
                color="error"
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  fontWeight: 600,
                  backgroundColor: "#b71c1c",
                  color: "#fff",
                  zIndex: 2,
                }}
              />
            )}
          </Card>
        </Grid>

        {/* Right: Product Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight={600} sx={{ mb: 1 }}>
            {product.name}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
            {product.prevPrice && (
              <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
                Rs. {product.prevPrice.toLocaleString()}
              </Typography>
            )}
            <Typography variant="h5" color="primary.main" fontWeight={700}>
              Rs. {product.price.toLocaleString()}
            </Typography>
          </Box>

          <Typography sx={{ mb: 3 }}>{product.description}</Typography>

          {/* Sizes */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Select Size
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "contained" : "outlined"}
                  onClick={() => setSelectedSize(size)}
                  sx={{ minWidth: 50 }}
                >
                  {size}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Add to Cart */}
          <Button
            variant="contained"
            color="primary"
            disabled={product.quantity === 0}
            sx={{ py: 1.5, px: 5, fontWeight: 600 }}
          >
            {product.quantity === 0 ? "Sold Out" : "Add to Cart"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
