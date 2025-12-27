import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/home/Footer";
import { getProducts, getProductsByCollectionId } from "../../api/productApi";
import { API_BASE_URL } from "../../api/productApi";
import { getSizesByProductCode } from "../../api/sizeApi";

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

export default function ProductPage() {

  const { mainCategory = '', collection = '', collectionId = ''} = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const collectionName = products?.[0]?.subcategory || "";
  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sizeFilter, setSizeFilter] = useState("all");
  const [selectedImages, setSelectedImages] = useState({});

    useEffect(() => {
    const loadProducts = async () => {
        try {
        let rowData;
        let data;
        const id = parseInt(collectionId);

        if (!isNaN(id)) {
            data = await getProductsByCollectionId(id);
        } else {
            data = await getProducts();
        }
        rowData = data.filter(
        (product, index, self) =>
            index === self.findIndex(p => p.productCode === product.productCode)
        );

        // For each product, fetch sizes
        const transformed = await Promise.all(
            rowData.map(async product => {
            const sizesResponse = await getSizesByProductCode(product.productCode);
            const sizes = sizesResponse || [];
            const sizeValues = sizes.map(s => s.sizeValue);
            const totalStock = sizes.reduce((acc, s) => acc + Number(s.stockQuantity), 0);

            return {
                id: product.productId,
                name: product.productName,
                price: product.newPrice || 0,
                oldPrice: product.oldPrice,
                discount:
                product.oldPrice && product.oldPrice > product.newPrice
                    ? `${Math.round((1 - product.newPrice / product.oldPrice) * 100)}% OFF`
                    : null,
                quantity: totalStock,
                size: sizeValues,
                category: product.category || "",
                subcategory: product.productCollection?.collectionName || "",
                images:
                product.productImage && product.productImage.length > 0
                    ? product.productImage.map(img => `${API_BASE_URL}${img.imagePath}`)
                    : ["https://via.placeholder.com/400"],
            };
            })
        );

        setProducts(transformed);
        console.log("Mapped products:", transformed);
        } catch (error) {
        console.error("Error fetching products:", error);
        }
    };

    loadProducts();
    }, [collectionId]);

  // Filter products by category
  let filteredByCategory = products; // Remove category filter for now
  console.log('Filtered by category:', filteredByCategory);

  // Apply filters
  const filteredProducts = filteredByCategory.filter((p) => {
    if (availability === "in-stock" && p.quantity === 0) return false;
    if (sizeFilter !== "all" && !p.size.includes(sizeFilter)) return false;
    if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
    return true;
  }); 

  const formattedMainCategory =
  mainCategory
    ? mainCategory.charAt(0).toUpperCase() + mainCategory.slice(1)
    : "";

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
                sx={{ mb: 3, color: "#111B1E", cursor: "pointer" }}
                onClick={() => navigate("/")}
            >
                {formattedMainCategory} &gt; {collectionName}
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
                    value="XL"
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
                    <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
                        <Card
                        sx={{
                            cursor: "pointer",
                            bgcolor: "#FFFCF5",
                            minHeight: { xs: 400, md: 460 },
                            display: "flex",
                            flexDirection: "column",
                            "&:hover": { boxShadow: 3 },
                            position: "relative",
                        }}
                        onClick={() => navigate(`/products/${item.id}`)}
                        >
                        {/* Main Image */}
                        <CardMedia
                            component="img"
                            image={selectedImages[item.id] || item.images[0]}
                            alt={item.name}
                            sx={{
                            objectFit: "cover",
                            width: "100%",
                            height: { xs: 300, sm: 350, md: 400, lg: 450 },
                            }}
                        />

                        {/* Discount Label */}
                        {item.discount && (
                            <Chip
                            label={item.discount}
                            color="error"
                            size="small"
                            sx={{ position: "absolute", top: 10, left: 10, fontWeight: 600 }}
                            />
                        )}

                        {/* Sold Out Overlay */}
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

                        {/* Product Info: Name and Price */}
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            color="#111B1E"
                            sx={{ mb: 1 }}
                            >
                            {item.name}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {item.oldPrice && (
                                <Typography
                                variant="body2"
                                sx={{ textDecoration: "line-through", color: "text.secondary" }}
                                >
                                Rs. {item.oldPrice.toLocaleString()}
                                </Typography>
                            )}
                            <Typography variant="body1" fontWeight={600} color="#111B1E">
                                Rs. {item.price.toLocaleString()}
                            </Typography>
                            </Box>
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