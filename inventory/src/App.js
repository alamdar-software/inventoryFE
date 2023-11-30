import Dashboard from "./components/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Location } from "./components/Location";
import Sidebar from "./components/Sidebar.jsx";
import Item from "./components/Item.js";
import { Currency } from "./components/Currency.jsx";
const theme = createTheme({
  palette: {
    background: {
      default: "rgb(241, 245, 241)",
    },
  },
});
function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/location/vessel" element={<Location />} />
              <Route path="/item" element={<Item />} />
              <Route path="/currency" element={<Currency />} />
            </Routes>
          </ThemeProvider>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
