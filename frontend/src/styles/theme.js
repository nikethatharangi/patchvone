// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
    primary: {
      main: "#FFFCF5", // dark gray / your main brand color
      contrastText: " #111B1E", // text color on primary background
    },
    secondary: {
      main: "#f59e0b", // golden yellow / accent color
      contrastText: "#000000",
    },
    background: {
      default: "#fafafa", // page background
      paper: "#ffffff",   // card, menu background
    },
    text: {
      primary: "#111B1E", // default text color
      secondary: "#64748b",
    },
  },
  typography: {
    fontFamily: "cursive",
    h4: { fontWeight: 600 },
    button: { textTransform: "none" }, // disables uppercase buttons
  },
});

export default theme;
