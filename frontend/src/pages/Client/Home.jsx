import React, { useState } from "react";
import Header from "../../components/home/Header";
import Banner from "../../components/home/Banner";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/home/Filters";
import Footer from "../../components/home/Footer";
import FloatingButton from "../../components/home/FloatingButton";
import CategorySection from "../../components/home/CategorySection";
import BestTrendingSection from "../../components/home/BestTrendingSection";
import FeatureHighlights from "../../components/home/FeatureHighlights";
import BackToTop from "../../components/home/BackToTop";
import NewsletterSection from "../../components/home/NewsLetterSection";
import { Box, Grid } from "@mui/material";

export default function Home() {
  const categories = [
    { name: "Men's", subcategories: ["Shop All", "Shorts", "Shirts"] },
    { name: "Women's", subcategories: ["Shop All", "Skirts", "Baggy Tees"] },
    { name: "Unisex", subcategories: ["Shop All", "Pants", "Baggy Tees"] },
    { name: "Accessories", subcategories: ["Shop All", "Caps", "Water Bottles"] },
  ];

  const [availability, setAvailability] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);

  const products = [
    { name: "Men Shirt", price: 50, available: true },
    { name: "Women Skirt", price: 30, available: false },
    { name: "Cap", price: 15, available: true },
  ];

  return (
    <>
      {/* <Header categories={categories} /> */}
      <Banner />
      <CategorySection />
      <BestTrendingSection />
      <FeatureHighlights />
      <BackToTop />
      <NewsletterSection />
      {/* <Box sx={{ p: 3 }}>
        <Filters
          availability={availability}
          setAvailability={setAvailability}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
        <Grid container>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Grid>
      </Box> */}
      <FloatingButton />
      <Footer />
    </>
  );
}