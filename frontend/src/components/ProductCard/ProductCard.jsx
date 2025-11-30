import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Card sx={{ maxWidth: 250, m: 1 }}>
      <CardMedia
        component="img"
        height="140"
        image={product.image || "https://via.placeholder.com/150"}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">${product.price}</Typography>
        <Typography color={product.available ? "green" : "red"}>
          {product.available ? "In Stock" : "Out of Stock"}
        </Typography>
        <Box mt={1}>
          <Button variant="contained" size="small">
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}