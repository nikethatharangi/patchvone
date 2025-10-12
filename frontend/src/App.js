//import logo from './logo.svg';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./styles/theme";
import './App.css';
import Home from "./pages/Client/Home";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;
