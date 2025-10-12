import React, { useState } from "react";
import logo from "../../assets/banners/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";

export default function Header({ categories }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "primary.main", color: "primary.contrastText" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", width: "auto", cursor: "pointer" }}
          />
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          {categories.map((cat) => (
            <Button
              key={cat.name}
              color="inherit"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { color: "#f59e0b" },
              }}
            >
              {cat.name}
            </Button>
          ))}
        </Box>

        {/* Search (hidden on very small) */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              width: { sm: 150, md: 200 },
            }}
          />
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          color="inherit"
          edge="end"
          onClick={() => setDrawerOpen(true)}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Drawer (Mobile Menu) */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box sx={{ width: 250, p: 2 }}>
            <List>
              {categories.map((cat) => (
                <ListItem button key={cat.name}>
                  <ListItemText primary={cat.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}