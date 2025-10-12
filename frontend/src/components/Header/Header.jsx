import React, { useState } from "react";
import logo from "../../assets/banners/logo.png";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";

export default function Header({ categories }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleMenu = (event, category) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategory(category);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side - Logo */}
        <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              height: "45px",
              width: "auto",
              cursor: "pointer",
            }}
          />
        </Box>

        {/* Center - Menu Tabs */}
        <Box sx={{ display: "flex", gap: 3, justifyContent: "center", flexGrow: 1 , fontSize: "1.2rem", fontWeight: "500"}}>
          {categories.map((cat) => (
            <Button
              key={cat.name}
              color="inherit"
              onClick={(e) => handleMenu(e, cat)}
              sx={{
                fontSize: "1.25rem",
                fontWeight: 600,
                textTransform: "none",
                letterSpacing: "0.5px",
                "&:hover": {
                  color: "#f59e0b",
                  transform: "scale(1.05)",
                  transition: "all 0.2s ease-in-out",
                },
              }}
            >
              {cat.name}
            </Button>
          ))}
        </Box>

        {/* Right side - Search box */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            width: 180,
            mr: 2,
          }}
        />

        {/* Dropdown Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {selectedCategory?.subcategories.map((sub) => (
            <MenuItem key={sub} onClick={handleClose}>
              {sub}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
