import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";
import Home from "./pages/Client/Home";
import ProductPage from "./pages/Client/ProductPage";
import ProductDetailPage from "./pages/Client/ProductDetailsPage";
import { fetchSubcategories } from "./services/categoryService";
import theme from "./styles/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  const [categories] = useState([
    {
      name: "Men",
      subcategories: ["Shop All", "Shorts", "T-Shirts", "Hoodies"],
    },
    {
      name: "Women",
      subcategories: ["Shop All", "Dresses", "Tops", "Bottoms"],
    },
    {
      name: "Unisex",
      subcategories: ["Shop All", "T-Shirts", "Accessories"],
    },
    {
      name: "Accessories",
      subcategories: ["Shop All", "Hats", "Bags", "Belts"],
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Router>
        <Header categories={categories} />

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Product Page — example: /men/shop-all */}
          <Route path="/:mainCategory/:subCategory" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
