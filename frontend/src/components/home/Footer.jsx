import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";
import TelePhoneIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "../../assets/social_media/instagram.png";
import FacebookIcon from "../../assets/social_media/facebook.png";
import WhatsappIcon from "../../assets/social_media/whatsapp.png";
import logo from "../../assets/banners/logo-footer.png";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#111B1E", color: "white", py: 5, px: { xs: 3, md: 8 }, mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {/* Left Section — Logo */}
        <Box sx={{ flex: "1 1 200px" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "100px", width: "auto", cursor: "pointer" }}
          />
        </Box>

        {/* Middle Section — Menu */}
        <Box sx={{ flex: "1 1 150px" }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            Menu
          </Typography>

          {["Men", "Women", "Unisex", "Accessories"].map((item) => (
            <Typography
              key={item}
              variant="body2"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                mb: 0.7,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {item}
            </Typography>
          ))}
        </Box>

        {/* Contact Section */}
        <Box sx={{ flex: "1 1 200px" }}>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              mb: 1.5,
            }}
          >
            Contact Us
          </Typography>

          {/* Phone */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <TelePhoneIcon sx={{ color: "white", fontSize: 22 }} />
            <Typography
              variant="body2"
              sx={{ fontFamily: "Montserrat, sans-serif" }}
            >
              +94 11 222 3344
            </Typography>
          </Box>

          {/* Email */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <EmailIcon sx={{ color: "white", fontSize: 22 }} />
            <Link
              href="mailto:hellopatchv@gmail.com"
              underline="hover"
              color="inherit"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.875rem",
              }}
            >
              hellopatchv@gmail.com
            </Link>
          </Box>
        </Box>

        {/* Right Section — Social Media */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2,justifyContent: "flex-end" }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={FacebookIcon} alt="Facebook" style={{ width: 28, height: 28 }} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={InstagramIcon} alt="Instagram" style={{ width: 28, height: 28 }} />
          </a>
          <a href="https://wa.me/94712345678" target="_blank" rel="noopener noreferrer">
            <img src={WhatsappIcon} alt="WhatsApp" style={{ width: 28, height: 28 }} />
          </a>
        </Box>
      </Box>

      {/* Footer Bottom Text */}
      <Typography
        variant="caption"
        sx={{
          display: "block",
          textAlign: "center",
          mt: 4,
          color: "#ccc",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        © {new Date().getFullYear()} PatchVOne. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
