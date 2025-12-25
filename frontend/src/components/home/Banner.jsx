import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getBanners } from "../../api/bannerApi";

const BASE_URL = "http://localhost:5276";
let bannerText = '';

export default function Banner() {
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const banners = await getBanners();

        if (banners.length > 0) {
          const lastRecord = banners[banners.length - 1]; // last record
          
          // full URL for the image
          const fullImageUrl = BASE_URL + lastRecord.bannerPath;
          bannerText = lastRecord.bannerText;

          setBannerUrl(fullImageUrl);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    loadBanner();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 200, sm: 300, md: 700 },
        backgroundImage: bannerUrl ? `url(${bannerUrl})` : "none",
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
        <Typography
        sx={{ 
          fontSize: { xs: "1rem", sm: "1.2rem", md: "2.5rem" },
          variant: "h4",
          fontWeight: "bold"
        }}>
          {bannerText}
        </Typography>
        <Typography
         sx={{ cursor: "pointer" }}
         onClick={() => {
          const section = document.getElementById("best-trending");
              if (section) {
              section.scrollIntoView({ behavior: "smooth" });
              }
         }}
         >
          Shop the latest trends now
        </Typography>
      </Box>
    </Box>
  );
}