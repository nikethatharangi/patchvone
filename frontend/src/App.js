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

  return (
    <ThemeProvider theme={theme}>
      {/* <CssBaseline /> */}
      <Router>
        {/*<Header categories={categories} />*/}

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />

          {/* Product Pages */}
          <Route path="/:mainCategory/:collection/:collectionId" element={<ProductPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;