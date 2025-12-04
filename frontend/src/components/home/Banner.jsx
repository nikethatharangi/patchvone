import React from "react";
import { Box, Typography } from "@mui/material";
import bannerImage from "../../assets/banners/banner.png";
import { getBanners } from "../../api/bannerApi";

export default function Banner() {
  const [bannerUrl, setBannerUrl] = useState(null);
    useEffect(() => {
    const loadBanner = async () => {
      try {
        const banners = await getBanners();

        if (banners.length > 0) {
          const lastBanner = banners[banners.length - 1]; // Get last record
          setBannerUrl(lastBanner.BannerPath);          // field name from DB
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
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
          New Arrivals are Here
        </Typography>
        <Typography>Shop the latest trends now</Typography>
      </Box>
    </Box>
  );
}