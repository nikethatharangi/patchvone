import React from "react";
import { Box, Typography } from "@mui/material";
import bannerImage from "../../assets/banners/banner.png";

export default function Banner() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 200, sm: 300, md: 700 },
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        mx: 2,
        mt: 2,
      }}
    >
      {/* Optional overlay text */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 30,
          color: "white",
          textShadow: "0 2px 6px rgba(0,0,0,0.7)",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          New Arrivals are Here
        </Typography>
        <Typography>Shop the latest trends now</Typography>
      </Box>
    </Box>
  );
}
