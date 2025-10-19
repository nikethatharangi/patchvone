import React, { useState } from "react";
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

const BestTrendingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Unisex");

  const trendingItems = {
    Men: [
      {
        name: "Classic Shirt",
        price: 1200,
        oldPrice: 1500,
        discount: "20% OFF",
        image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      },
      {
        name: "Casual Shorts",
        price: 900,
        oldPrice: 1000,
        image: "https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg",
      },
      {
        name: "Slim Jeans",
        price: 2000,
        oldPrice: 2500,
        discount: "Sale",
        image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      },
      {
        name: "Formal Pants",
        price: 1800,
        image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
      },
    ],
    Women: [
      {
        name: "Floral Dress",
        price: 2200,
        oldPrice: 2800,
        discount: "20% OFF",
        image: "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      },
      {
        name: "Skirt",
        price: 1500,
        image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      },
      {
        name: "Baggy Tee",
        price: 1100,
        image: "https://images.pexels.com/photos/936559/pexels-photo-936559.jpeg",
      },
      {
        name: "Handbag",
        price: 3200,
        oldPrice: 3500,
        image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
      },
    ],
    Unisex: [
      {
        name: "Graphic Tee",
        price: 999,
        oldPrice: 1200,
        discount: "10% OFF",
        image: "https://images.pexels.com/photos/994517/pexels-photo-994517.jpeg",
      },
      {
        name: "Hoodie",
        price: 1500,
        oldPrice: 1800,
        image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
      },
      {
        name: "Joggers",
        price: 1700,
        image: "https://images.pexels.com/photos/6311397/pexels-photo-6311397.jpeg",
      },
      {
        name: "Sneakers",
        price: 3200,
        oldPrice: 3800,
        discount: "15% OFF",
        image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
      },
    ],
    Accessories: [
      {
        name: "Cap",
        price: 800,
        image: "https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg",
      },
      {
        name: "Watch",
        price: 2500,
        oldPrice: 3000,
        image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
      },
      {
        name: "Sunglasses",
        price: 1800,
        discount: "20% OFF",
        image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg",
      },
      {
        name: "Water Bottle",
        price: 1200,
        image: "https://images.pexels.com/photos/932056/pexels-photo-932056.jpeg",
      },
    ],
  };

  return (
    <Box sx={{ my: 6, px: { xs: 2, md: 6 } }}>
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
          gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
          gap: 3,
        }}
      >
        {trendingItems[selectedCategory].map((item, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardMedia
              component="img"
              image={item.image}
              alt={item.name}
              sx={{ height: 250, objectFit: "cover" }}
            />
            {item.discount && (
              <Chip
                label={item.discount}
                color="error"
                size="small"
                sx={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  fontWeight: 600,
                }}
              />
            )}
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {item.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  Rs. {item.price}
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
