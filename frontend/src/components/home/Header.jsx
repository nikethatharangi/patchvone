import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Fade,
  Typography,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../../assets/banners/logo.png";

import {
  ListItemButton,
  Collapse,
  Divider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

// Social media icons
import FacebookIconImg from "../../assets/social_media/facebook.png";
import InstagramIconImg from "../../assets/social_media/instagram.png";
import WhatsappIconImg from "../../assets/social_media/whatsapp.png";

export default function Header({ categories }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Example product data (replace with API later)
  const products = [
    {
      id: 1,
      name: "Elegant Men’s Shirt",
      price: "Rs. 3,200",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    },
    {
      id: 2,
      name: "Artsy Women’s Dress",
      price: "Rs. 4,500",
      image: "https://images.unsplash.com/photo-1542060748-10c28b62716e?w=400",
    },
    {
      id: 3,
      name: "Unisex Hoodie",
      price: "Rs. 5,000",
      image: "https://images.unsplash.com/photo-1593032465171-8b1c4b8b86f2?w=400",
    },
    {
      id: 4,
      name: "Stylish Slippers",
      price: "Rs. 1,200",
      image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMenuOpen = (event, menuName) => {
    if (activeMenu === menuName) {
      setAnchorEl(null);
      setActiveMenu(null);
    } else {
      setAnchorEl(event.currentTarget);
      setActiveMenu(menuName);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setActiveMenu(null);
  };

  const handleSearchOpen = () => setSearchOpen(true);
  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery("");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left - Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: "40px", cursor: "pointer" }} />
          </Box>

          {/* Center - Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            {categories.map((cat) => (
              <Box key={cat.name}>
                <Button
                  color="inherit"
                  sx={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { color: "#aa9d75" },
                  }}
                  onClick={(e) => handleMenuOpen(e, cat.name)}
                >
                  {cat.name}
                </Button>

                {cat.subcategories && (
                  <Menu
                    anchorEl={anchorEl}
                    open={activeMenu === cat.name}
                    onClose={handleMenuClose}
                    slotProps={{
                      list: { sx: { minWidth: 180 } },
                    }}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    {cat.subcategories.map((sub) => (
                      <MenuItem key={sub} onClick={handleMenuClose}>
                        {sub}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            ))}
          </Box>

          {/* Right - Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Social Media Icons */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" }, // hide on mobile, show on md+
                alignItems: "center",
                gap: 2,
              }}
            >
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={FacebookIconImg} alt="Facebook" style={{ width: 24, height: 24 }} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={InstagramIconImg} alt="Instagram" style={{ width: 24, height: 24 }} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                <img src={WhatsappIconImg} alt="WhatsApp" style={{ width: 24, height: 24 }} />
              </a>
            </Box>

            {/* Search, Cart, Profile */}
            <IconButton color="inherit" onClick={handleSearchOpen}>
              <SearchIcon />
            </IconButton>
            <IconButton color="inherit">
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>

            {/* Mobile Menu */}
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          display: { xs: "block", md: "none" }, // Only visible in mobile
        }}
      >
        <Box
          sx={{
            width: 260,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          {/* Category List */}
          <List>
            {categories.map((cat, index) => {
              const isOpen = openIndex === index;
              return (
                <Box key={cat.name}>
                  <ListItemButton onClick={() => handleToggle(index)}>
                    <ListItemText
                      primary={cat.name}
                      primaryTypographyProps={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                        color: "#111B1E",
                      }}
                    />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  {/* Subcategories collapse */}
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {cat.subcategories.map((sub) => (
                        <ListItemButton
                          key={sub}
                          sx={{ pl: 4 }}
                          onClick={() => setDrawerOpen(false)}
                        >
                          <ListItemText
                            primary={sub}
                            primaryTypographyProps={{
                              fontFamily: "Montserrat, sans-serif",
                              color: "#555",
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>

                  <Divider sx={{ my: 1 }} />
                </Box>
              );
            })}
          </List>

          {/* Social Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              pb: 2,
              borderTop: "1px solid #ddd",
              pt: 2,
            }}
          >
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={FacebookIconImg} alt="Facebook" style={{ width: 28, height: 28 }} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={InstagramIconImg} alt="Instagram" style={{ width: 28, height: 28 }} />
            </a>

            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={WhatsappIconImg} alt="WhatsApp" style={{ width: 28, height: 28 }} />
            </a>
          </Box>
        </Box>
      </Drawer>

      {/* 🔍 Search Modal with Results */}
      <Modal open={searchOpen} onClose={handleSearchClose} closeAfterTransition>
        <Fade in={searchOpen}>
          <Box
            sx={{
              position: "fixed",
              top: "15%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: { xs: "90%", sm: "70%", md: "50%" },
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {/* Search Input */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <SearchIcon sx={{ color: "text.secondary" }} />
              <TextField
                variant="standard"
                placeholder="Search for products..."
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{ disableUnderline: true }}
              />
            </Box>

            {/* Results */}
            {searchQuery && (
              <Box sx={{ mt: 3 }}>
                {filteredProducts.length > 0 ? (
                  <Grid container spacing={2}>
                    {filteredProducts.map((item) => (
                      <Grid item xs={12} sm={6} key={item.id}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            border: "1px solid #eee",
                            p: 1.5,
                            borderRadius: 2,
                            "&:hover": { boxShadow: 2 },
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: 70,
                              height: 70,
                              borderRadius: 8,
                              objectFit: "cover",
                            }}
                          />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>{item.name}</Typography>
                            <Typography sx={{ color: "#f59e0b", fontWeight: 500 }}>
                              {item.price}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography sx={{ mt: 2, color: "text.secondary" }}>
                    No products found.
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
