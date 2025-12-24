import React, { useEffect, useState } from "react";
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
import { getProductCollections } from "../../api/productCollectionApi";




export default function Home() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
  const loadProductCollections = async () => {
    try {
      const productCollections = await getProductCollections();

      const menCollections = productCollections
        .filter((c) => c.colletionType === "1")
        .map((c) => ({
          id: c.collectionId,
          name: c.collectionName,
        }));

      const womenCollections = productCollections
        .filter((c) => c.colletionType === "2")
        .map((c) => ({
          id: c.collectionId,
          name: c.collectionName,
        }));

      const unisexCollections = productCollections
        .filter((c) => c.colletionType === "3")
        .map((c) => ({
          id: c.collectionId,
          name: c.collectionName,
        }));

      const accesoriesCollections = productCollections
        .filter((c) => c.colletionType === "4")
        .map((c) => ({
          id: c.collectionId,
          name: c.collectionName,
        }));

      setCategories([
        {
          name: "Men",
          subcategories: menCollections,
        },
        {
          name: "Women",
          subcategories: womenCollections,
        },
        { name: "Unisex",
          subcategories: unisexCollections,
        },
        { name: "Accessories",
          subcategories: accesoriesCollections,
        },
      ]);
    } catch (error) {
      console.error("Error fetching product collections:", error);
    }
  };

  loadProductCollections();
}, []);
  

  return (
    <>
      {<Header categories={categories} />}
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