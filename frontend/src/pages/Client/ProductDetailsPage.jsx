import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "../../api/productApi";
import { API_BASE_URL } from "../../api/productApi";
import { getSizesByProductCode } from "../../api/sizeApi";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Chip,
} from "@mui/material";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(productId);

        const images =
          data.productImage && data.productImage.length > 0
            ? data.productImage.map((img) => `${API_BASE_URL}${img.imagePath}`)
            : ["https://via.placeholder.com/400"];

        setProduct({ ...data, images });
        setSelectedImage(images[0]);

        const sizesData = await getSizesByProductCode(data.productCode);
        setSizes(sizesData || []);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <Typography sx={{ mt: 5 }}>Loading product...</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, mt: 2 }}>
      {/* Breadcrumb */}
      <Typography
        variant="subtitle2"
        sx={{ mb: 2, cursor: "pointer", color: "primary.main" }}
        onClick={() => navigate(`/product/${product.productId}`)}
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
              alt={product.productName}
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
                    border:
                      selectedImage === img ? "2px solid #aa9d75" : "1px solid #ccc",
                    objectFit: "cover",
                    "&:hover": { opacity: 0.8 },
                  }}
                />
              ))}
            </Box>

            {product.stockQuantity === "0" && (
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
            {product.productName}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
            {product.oldPrice && (
              <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
                Rs. {product.oldPrice.toLocaleString()}
              </Typography>
            )}
            <Typography variant="h5" color="text.primary" fontWeight={700}>
              Rs. {product.newPrice.toLocaleString()}
            </Typography>
          </Box>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Color: {product.color || 'N/A'}
          </Typography>

          {/* Sizes */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Select Size
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap"}}>
              {sizes.length > 0 ? (
                sizes.map((s, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    sx={{ minWidth: 50, backgroundColor: "#111B1E", color: "#fff" }}
                  >
                    {s.sizeValue} ({s.stockQuantity})
                  </Button>
                ))
              ) : (
                <Typography>No sizes available</Typography>
              )}
            </Box>
          </Box>

          {/* Add to Cart */}
          <Button
            variant="contained"
            color="primary"
            disabled={product.stockQuantity === "0"}
            sx={{ py: 1.5, px: 5, fontWeight: 600 }}
          >
            {product.stockQuantity === "0" ? "Sold Out" : "Add to Cart"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
