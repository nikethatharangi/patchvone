import React from "react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "#1976d2", color: "white", p: 3, mt: 5 }}>
      <Typography variant="h6">Clothing Store</Typography>
      <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
        <Box>
          <Typography>About Us</Typography>
          <Link href="#" color="inherit">Our Story</Link>
        </Box>
        <Box>
          <Typography>Our Services</Typography>
          <Link href="#" color="inherit">Shipping</Link>
        </Box>
        <Box>
          <Typography>Newsletter</Typography>
          <TextField placeholder="Email Address" size="small" sx={{ backgroundColor: "white", borderRadius: 1 }} />
          <Button variant="contained" sx={{ ml: 1, mt: 1 }}>Subscribe</Button>
        </Box>
      </Box>
    </Box>
  );
}
