import Dashboard from "./components/Dashboard";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Location } from "./components/Location";
import Sidebar from "./components/Sidebar.jsx";
import Item from "./components/Item.js";
import Pickup from "./components/Pickup.js";
import Uom from "./components/Uom.js";
import Shipper from "./components/Shipper.js";
import Consignee from "./components/Consignee.js";

import { Currency } from "./components/Currency.jsx";
import LocationList from "./components/LocationList.js";
import Moc from "./pages/Moc.jsx";
import Update from "./components/Update.js";
import Brand from "./pages/Brand";
import UpdateBrand from "./pages/UpdateBrand";

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
              <Route path="/pick-up" element={<Pickup />} />
              <Route path="/uom" element={<Uom />} />
              <Route path="/shipper" element={<Shipper />} />
              <Route path="/consignee" element={<Consignee />} />
              <Route path="/Location-Vessel" element={<LocationList />} />
              <Route path="/MOC" element={<Moc />} />
              <Route path="/updateLocation/:id" element={<Update />} />
              <Route path="/currency" element={<Currency />} />
              <Route path="/brand" element={<Brand />} />
              <Route path="/brand/edit/:id" element={<UpdateBrand />} />
            </Routes>
          </ThemeProvider>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
