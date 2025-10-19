import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/home/Footer";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

// Mock products
const allProducts = [
  {
    id: "1",
    name: "Elegant Men’s Shirt",
    price: 3200,
    oldPrice: 4000,
    discount: "20% OFF",
    quantity: 5,
    size: "M",
    category: "Men",
    subcategory: "Shop All",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.pexels.com/photos/936559/pexels-photo-936559.jpeg",
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    ],
  },
  {
    id: "2",
    name: "Artsy Women’s Dress",
    price: 4500,
    oldPrice: 5000,
    discount: "10% OFF",
    quantity: 0,
    size: "L",
    category: "Women",
    subcategory: "Shop All",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    ],
  },
  {
    id: "3",
    name: "Elegant Men’s Shirt",
    price: 3200,
    oldPrice: 4000,
    discount: "20% OFF",
    quantity: 5,
    size: "M",
    category: "Men",
    subcategory: "Shop All",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.pexels.com/photos/936559/pexels-photo-936559.jpeg",
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    ],
  },
{
    id: "4",
    name: "Elegant Men’s Shirt",
    price: 3200,
    oldPrice: 4000,
    discount: "20% OFF",
    quantity: 5,
    size: "M",
    category: "Men",
    subcategory: "Shop All",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.pexels.com/photos/936559/pexels-photo-936559.jpeg",
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    ],
  },
  {
    id: "5",
    name: "Elegant Men’s Shirt",
    price: 3200,
    oldPrice: 4000,
    discount: "20% OFF",
    quantity: 5,
    size: "M",
    category: "Men",
    subcategory: "Shop All",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.pexels.com/photos/936559/pexels-photo-936559.jpeg",
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    ],
  },
  {
    id: "6",
    name: "Elegant Men’s Shirt",
    price: 3200,
    oldPrice: 4000,
    discount: "20% OFF",
    quantity: 5,
    size: "M",
    category: "Men",
    subcategory: "Shop All",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
      "https://images.pexels.com/photos/936559/pexels-photo-936559.jpeg",
      "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    ],
  },
  // Add more products...
];

export default function ProductPage() {
  const { mainCategory, subCategory } = useParams();
  const navigate = useNavigate();

  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sizeFilter, setSizeFilter] = useState("all");
  const [selectedImages, setSelectedImages] = useState({});

  // Filter products by category/subcategory
  let products = allProducts.filter(
    (p) =>
      p.category.toLowerCase() === mainCategory.toLowerCase() &&
      (subCategory.toLowerCase() === "shop all" ||
        p.subcategory.toLowerCase() === subCategory.toLowerCase())
  );

  // Apply filters
  const filteredProducts = products.filter((p) => {
    if (availability === "in-stock" && p.quantity === 0) return false;
    if (sizeFilter !== "all" && p.size !== sizeFilter) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box
            sx={{
                px: { xs: 2, md: 5 },
                py: 2,
                mt: 2,
                bgcolor: "#FFFCF5",
                minHeight: "100vh",
            }}
            >
            <Typography
                variant="h6"
                fontWeight={500}
                sx={{ mb: 3, color: "#111B1E" }}
            >
                {mainCategory} &gt; {subCategory}
            </Typography>

            {/* Filters */}
            <Box
                sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}
            >
                {/* Availability */}
                <ToggleButtonGroup
                value={availability}
                exclusive
                onChange={(e, val) => val && setAvailability(val)}
                sx={{ backgroundColor: "#FFFCF5" }}
                >
                <ToggleButton
                    value="all"
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    All
                </ToggleButton>
                <ToggleButton
                    value="in-stock"
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    In Stock
                </ToggleButton>
                </ToggleButtonGroup>

                {/* Size */}
                <ToggleButtonGroup
                value={sizeFilter}
                exclusive
                onChange={(e, val) => val && setSizeFilter(val)}
                sx={{ backgroundColor: "#FFFCF5" }}
                >
                <ToggleButton
                    value="all"
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    All Sizes
                </ToggleButton>
                <ToggleButton
                    value="S"
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    S
                </ToggleButton>
                <ToggleButton
                    value="M"
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    M
                </ToggleButton>
                <ToggleButton
                    value="L"
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    L
                </ToggleButton>
                            <ToggleButton
                    value="L"
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    XL
                </ToggleButton>
                </ToggleButtonGroup>

                {/* Price */}
                <ToggleButtonGroup
                value={priceRange[1]}
                exclusive
                onChange={(e, val) => {
                    if (val === 5000) setPriceRange([0, 5000]);
                    else if (val === 10000) setPriceRange([5001, 10000]);
                }}
                sx={{ backgroundColor: "#FFFCF5" }}
                >
                <ToggleButton
                    value={5000}
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    0 - 5,000
                </ToggleButton>
                <ToggleButton
                    value={10000}
                    sx={{ "&.Mui-selected": { bgcolor: "#aa9d75", color: "#FFFCF5" } }}
                >
                    5,001 - 10,000
                </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            {/* Product Grid */}
            <Grid container spacing={3} justifyContent="center">
                {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                    <Grid item xs={6} sm={6} md={3} key={item.id}>
                    <Card
                        sx={{
                        cursor: "pointer",
                        bgcolor: "#FFFCF5",
                        height: { xs: 420, md: 460 },
                        display: "flex",
                        flexDirection: "column",
                        "&:hover": { boxShadow: 3 },
                        position: "relative",
                        }}
                        onClick={() => navigate(`/product/${item.id}`)}
                    >
                        {/* Main Image */}
                        <CardMedia
                        component="img"
                        height={{xs: 420, md: 460}}
                        image={selectedImages[item.id] || item.images[0]}
                        alt={item.name}
                        sx={{ 
                            objectFit: "cover",     
                            width: "100%", 
                            display: "block" 
                        }}
                        />

                        {/* Discount label */}
                        {item.discount && (
                        <Chip
                            label={item.discount}
                            color="error"
                            size="small"
                            sx={{ position: "absolute", top: 10, left: 10, fontWeight: 600 }}
                        />
                        )}

                        {/* Thumbnail Selector */}
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, p: 1 }}>
                        {item.images.map((img, idx) => (
                            <Box
                            key={idx}
                            component="img"
                            src={img}
                            sx={{
                                width: { xs: 35, md: 40 },
                                height: { xs: 35, md: 40 },
                                objectFit: "cover",
                                border:
                                selectedImages[item.id] === img || (!selectedImages[item.id] && idx === 0)
                                    ? "2px solid #aa9d75"
                                    : "1px solid #FFFCF5",
                                borderRadius: 1,
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImages({ ...selectedImages, [item.id]: img });
                            }}
                            />
                        ))}
                        </Box>

                        {/* Product Info */}
                        <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600} color="#111B1E">
                            {item.name}
                        </Typography>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                            {item.oldPrice && (
                            <Typography
                                variant="body2"
                                sx={{ textDecoration: "line-through", color: "text.secondary" }}
                            >
                                Rs. {item.oldPrice.toLocaleString()}
                            </Typography>
                            )}
                            <Typography variant="body1" fontWeight={400} color="#111B1E">
                            Rs. {item.price.toLocaleString()}
                            </Typography>
                        </Box>
                            {/* Sold Out overlay */}
                            {item.quantity === 0 && (
                            <Box
                                sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                bgcolor: "rgba(0,0,0,0.5)",
                                color: "#FFFCF5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                                fontSize: { xs: 16, md: 18 },
                                zIndex: 1,
                                textTransform: "uppercase",
                                }}
                            >
                                Sold Out
                            </Box>
                            )}
                        </CardContent>
                    </Card>
                    </Grid>
                ))
                ) : (
                <Typography sx={{ mt: 5, color: "#111B1E" }}>
                    No products found in this category.
                </Typography>
                )}
            </Grid>
        </Box>
        <Footer />
    </Box>
  );
}
