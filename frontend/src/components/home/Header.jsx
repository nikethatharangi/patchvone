import React, { useEffect,useState } from "react";
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
  ListItemButton,
  ListItemText,
  Collapse,
  Divider,
  Modal,
  TextField,
  Fade,
  Typography,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import logo from "../../assets/banners/logo.png";
import { useNavigate } from "react-router-dom";

// Social media icons
import FacebookIconImg from "../../assets/social_media/facebook.png";
import InstagramIconImg from "../../assets/social_media/instagram.png";
import WhatsappIconImg from "../../assets/social_media/whatsapp.png";
import TiktokIconImg from "../../assets/social_media/tiktok.png";

import { getProducts } from "../../api/productApi";

export default function Header({ categories }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

    fetchProducts();
  }, []);

  // Handlers
  const handleToggle = (index) => setOpenIndex(openIndex === index ? null : index);
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
    p.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

    // ✅ Navigate to category/subcategory
  const handleCategoryClick = (main, sub) => {
    const path = `/${main.toLowerCase()}/collection/${sub.id}`;
    navigate(path);
    handleMenuClose();
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "primary.main" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ height: 40, cursor: "pointer" }} />
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
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    {cat.subcategories.map((sub) => (
                      <MenuItem
                        key={sub.id}
                        onClick={() => handleCategoryClick(cat.name, sub)}
                      >
                        {sub.name}
                      </MenuItem>
                    ))}
                  </Menu>
                )}
              </Box>
            ))}
          </Box>

          {/* Right Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Social Media (hidden on mobile) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <a href="https://www.facebook.com/profile.php?id=61583263724276" target="_blank" rel="noopener noreferrer">
                <img src={FacebookIconImg} alt="Facebook" style={{ width: 24, height: 24 }} />
              </a>
              <a href="https://www.instagram.com/patchvone?igsh=MXRzMnU5NWt1c3U5bA==" target="_blank" rel="noopener noreferrer">
                <img src={InstagramIconImg} alt="Instagram" style={{ width: 24, height: 24 }} />
              </a>
              <a href="https://api.whatsapp.com/send?phone=94707009208" target="_blank" rel="noopener noreferrer">
                <img src={WhatsappIconImg} alt="WhatsApp" style={{ width: 24, height: 24 }} />
              </a>
              <a href="https://www.tiktok.com/@patchvone?_r=1&_t=ZS-92UhbCVyU5I" target="_blank" rel="noopener noreferrer">
                <img src={TiktokIconImg} alt="Tiktok" style={{ width: 24, height: 24 }} />
              </a>
            </Box>

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

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ display: { xs: "block", md: "none" } }}
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

                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {cat.subcategories.map((sub) => (
                        <ListItemButton
                          key={sub.id}
                          sx={{ pl: 4 }}
                          onClick={() => handleCategoryClick(cat.name, sub)}
                        >
                          <ListItemText primary={sub.name} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>

                  <Divider sx={{ my: 1 }} />
                </Box>
              );
            })}
          </List>

          {/* Social Media (bottom only in mobile) */}
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
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={FacebookIconImg} alt="Facebook" style={{ width: 28, height: 28 }} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={InstagramIconImg} alt="Instagram" style={{ width: 28, height: 28 }} />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <img src={WhatsappIconImg} alt="WhatsApp" style={{ width: 28, height: 28 }} />
            </a>
          </Box>
        </Box>
      </Drawer>

      {/* Search Modal */}
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

            {searchQuery && (
              <Box sx={{ mt: 3 }}>
                {filteredProducts.length > 0 ? (
                  <Grid container spacing={2}>
                    {filteredProducts.map((item) => (
                      <Grid item xs={12} sm={6} key={item.productId}>
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
                            src={`http://localhost:5276${item.productImage[0]?.imagePath}`}
                            alt={item.productName}
                            style={{
                              width: 70,
                              height: 70,
                              borderRadius: 8,
                              objectFit: "cover",
                            }}
                          />
                          <Box>
                            <Typography sx={{ fontWeight: 600 }}>{item.productName}</Typography>
                            <Typography sx={{ color: "#aa9d7b", fontWeight: 500 }}>
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