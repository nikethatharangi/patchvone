import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import Delivery from "../../assets/icons/delivery.png";
import Bank from "../../assets/icons/money.png";
import Collection from "../../assets/icons/shirt.png";
import Country from "../../assets/icons/map.png";


const features = [
  {
    type: "image",
    icon: Delivery,
    title: "Cash on delivery",
    subtitle: "Convenient doorstep payment option",
  },
  {
    type: "image",
    icon: Bank,
    title: "Bank transfers",
    subtitle: "Simple and reliable- no cards or extra charges needed",
  },
  {
    type: "image",
    icon: Collection,
    title: "Unique collections",
    subtitle: "New collection every 2 months",
  },
  {
    type: "image",
    icon: Country,
    title: "Made in Sri Lanka",
    subtitle: "Crafted with care and sustainability",
  },
];

const FeatureHighlights = () => {
  return (
    <Box sx={{ backgroundColor: "#fafafa" }}>
      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 4, sm: 6, md: 8 },
          px: { xs: 2, sm: 4, md: 8 },
          textAlign: "center",
        }}
      >
        <Grid
          container
          spacing={{ xs: 3, sm: 4, md: 6 }} // adaptive spacing between items
          justifyContent="center"
          alignItems="center"
        >
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0px 4px 16px rgba(0,0,0,0.08)",
                    borderRadius: "12px",
                  },
                  p: { xs: 1, sm: 2 },
                }}
              >
                {feature.type === "image" ? (
                  <Box
                    component="img"
                    src={feature.icon}
                    alt={feature.title}
                    sx={{
                      width: { xs: 60, sm: 70, md: 80 },
                      height: { xs: 60, sm: 70, md: 80 },
                      objectFit: "contain",
                      mb: 2,
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      "& svg": {
                        fontSize: { xs: 50, sm: 55, md: 60 },
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>
                )}

                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif",
                    mb: 0.5,
                    fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    maxWidth: 240,
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: { xs: "0.85rem", sm: "0.9rem", md: "1rem" },
                  }}
                >
                  {feature.subtitle}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureHighlights;