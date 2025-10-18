import React from "react";
import { Typography, Box } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" }, 
        justifyContent: "flex-start",    
        alignItems: "center",
        px: { sm: 4, md: 8 },
        py: 0,
        gap: 1,  
        cursor: "pointer",                            
      }}
      onClick={handleClick}
    >
      <KeyboardArrowUpIcon sx={{ color: "text.main", fontSize: { sm: 24, md: 28 } }} />
      <Typography
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 600,
          textDecoration: "underline",
          cursor: "pointer",
          fontSize: { sm: "1rem", md: "1.1rem" },
          color: "text.main",
        }}
      >
        Back to Top
      </Typography>
    </Box>
  );
};

export default BackToTop;