import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from "@mui/material";
import { getProductsByCategory } from "../../api/productApi";

const CATEGORY_MAP = {
  Men: "1",
  Women: "2",
  Unisex: "3",
  Accessories: "4",
};


const BestTrendingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (categoryName) => {
    try {
      setLoading(true);
      const categoryId = CATEGORY_MAP[categoryName];

      const response = await getProductsByCategory(categoryId);
      const filteredProducts = response.filter(
          (product, index, self) =>
          index === self.findIndex((p) => p.productCode === product.productCode)
      );

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box id="best-trending" sx={{ my: 6, px: { xs: 2, md: 6 } }}>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontWeight: "bold",
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        Best Trendings
      </Typography>

      {/* Tabs */}
      <Tabs
        value={selectedCategory}
        onChange={(e, val) => setSelectedCategory(val)}
        centered
        textColor="secondary"
        indicatorColor="secondary"
        sx={{ mb: 4 }}
      >
        {["Men", "Women", "Unisex", "Accessories"].map((cat) => (
          <Tab key={cat} value={cat} label={cat} />
        ))}
      </Tabs>

      {/* Items */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 3,
        }}
      >
        {loading && <Typography>Loading...</Typography>}

        {!loading &&
          products.map((item) => (
            <Card
              key={item.productId}
              onClick={() => navigate(`/products/${item.productId}`)}
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                cursor: "pointer",
                position: "relative",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={
                  item.productImage?.[0]
                    ? `http://localhost:5276${item.productImage[0].imagePath}`
                    : "/no-image.png"
                }
                alt={item.productName}
              />

              {item.oldPrice > item.newPrice && (
                <Chip
                  label="Sale"
                  color="error"
                  size="small"
                  sx={{ position: "absolute", top: 10, left: 10 }}
                />
              )}

              <CardContent>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.productName}
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  {item.oldPrice && (
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      Rs. {item.oldPrice}
                    </Typography>
                  )}
                  <Typography variant="body1" fontWeight={600}>
                    Rs. {item.newPrice}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
};

export default BestTrendingSection;