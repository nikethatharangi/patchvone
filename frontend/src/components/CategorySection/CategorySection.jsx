import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import menImg from "../../assets/categories/men.png";
import womenImg from "../../assets/categories/women.png";
import unisexImg from "../../assets/categories/unisex.png";
import accessoriesImg from "../../assets/categories/accessories.png";

export default function CategorySection() {
  const categories = [
    { name: "MENS", image: menImg },
    { name: "WOMENS", image: womenImg },
    { name: "UNISEX", image: unisexImg },
    { name: "Accessories", image: accessoriesImg },
  ];

 
  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {categories.map((cat) => (
          <Box
            key={cat.name}
            sx={{
              position: "relative",
              width: { xs: "100%", sm: "48%", md: "23%" },
              height: { xs: 200, sm: 250, md: 400 },
              cursor: "pointer",
              borderRadius: 2,
              overflow: "hidden",
              "&:hover img": { transform: "scale(1.05)" },
            }}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                transition: "transform 0.4s ease",
                borderRadius: "12px",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                position: "absolute",
                bottom: 15,
                left: 15,
                color: "white",
                fontWeight: "bold",
                textShadow: "0 2px 6px rgba(0,0,0,0.7)",
              }}
            >
              {cat.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}