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
import Category from "./pages/Category";
import UpdateCategory from "./pages/UpdateCategory";
import TransferItem from "./pages/TransferItem.js";

import Mto from "./components/Mto.js";
import InternalTransfer from "./components/InternalTransfer.js";
import ViewConsignee from "./pages/ViewConsignee";
import UpdateConsignee from "./components/UpdateConsignee.js";
import ConsumeItem from "./components/ConsumeItem.js";
import Inventory from "./components/Inventory.js";
import ScrappedItem from "./components/ScrappedItem.js";
import IncomingStock from "./pages/IncomingStock.js";
import SingleIncome from "./components/SingleIncome.js";
import BulkIncome from "./components/BulkIncome.js";
import User from "./components/User.js";
import DailyDataCount from "./pages/DailyDataCount.js";
import UpdateCurrency from "./pages/UpdateCurrency";
import UpdateShipper from "./components/UpdateShipper";
import ViewItem from "./components/ViewItem.js";
import Cipl from "./components/Cipl.js";
import ViewCipl from "./pages/ViewCipl";
import PrintCipl from "./pages/PrintCipl";
import ViewTransfer from "./pages/ViewTransfer";
import UpdateEntity from "./components/UpdateEntity";
import Entity from "./pages/Entity";
import InventoryList from "./components/InventoryList.js";
import UpdateInventory from "./components/UpdateInventory.js";
import ViewIncoming from "./components/ViewIncoming.js";
import UpdateIncoming from "./components/UpdateIncoming.js";
import ReportsDashboard from "./pages/ReportsDashboard";
import StockReportDashboard from "./pages/StockReportDashboard";
import SearchInventory from "./pages/SearchInventory";
import SearchIncoming from "./pages/SearchIncoming";
import StockReport from "./pages/StockReport";
import ViewMto from "./components/ViewMto.js";
import PrintMto from "./components/PrintMto.js";
import UpdateMto from "./components/UpdateMto.js";
import ViewInternal from "./components/ViewInternal.js";
import PrintInternal from "./components/PrintInternal.js";
import MasterReports from "./components/MasterReports.js";
import ConsumeReport from "./components/ConsumeReport.js";
import ScrappedReport from "./components/ScrappedReport.js";
import ItemServiceReport from "./components/ItemServiceReport.js";
import ReportItem from "./pages/Reports/ReportItem.js";
import LocationReport from "./pages/Reports/locationReport.js";
import TransferItemDashboard from "./pages/Dashboards/transferItemDashboard.js";
import MtoReports from "./components/MtoReports.js";
import InternalTransferReport from "./components/InternalTransferReport.js";
import CiplReport from "./components/CiplReport.js";
import UpdatePickup from "./components/UpdatePickup.js";
import UpdateUom from "./components/UpdateUom.js";
import UpdateItem from "./components/UpdateItem.js";
import UpdateConsumed from "./pages/UpdateConsumed.js";
import ViewConsume from "./pages/ViewConsume.js";
import ViewScrapp from "./pages/ViewScrap";
import UpdateScrapped from "./pages/UpdateScrapped";
import ViewInventoryMoc from "./components/ViewInventoryMoc.js";
import LocationDashboard from "./components/LocationDashboard.js";
import Signup from "./pages/Login/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import PrivateRoute from "./components/PrivateRoute";
import OnlySuperAdmin from "./components/OnlySuperAdminRoute";
import ChangePassword from "./components/ChangePassword";
import ViewUser from "./components/ViewUser";
import UpdateUser from "./components/UpdateUser";
import VerifierandApprover from "./components/VerifierAndApproverRoute";
const theme = createTheme({
  palette: {
    background: {
      default: "rgb(241, 245, 241)",
    },
  },
});
function App() {
  /* const WithSidebarLayout = ({ children }) => (
    <>
      <Sidebar>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Sidebar>
    </>
  );

  const WithoutSidebarLayout = ({ children }) => (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </> */

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route element={<OnlySuperAdmin />}>
                <Route
                  path="/add-user"
                  element={
                    <Sidebar>
                      <Signup />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-user"
                  element={
                    <Sidebar>
                      <ViewUser />
                    </Sidebar>
                  }
                />
                <Route
                  path="/api/user/update/:id"
                  element={
                    <Sidebar>
                      <UpdateUser />
                    </Sidebar>
                  }
                />
                <Route
                  path="/add-location"
                  element={
                    <Sidebar>
                      <Location />
                    </Sidebar>
                  }
                />
                <Route
                  path="/change-password"
                  element={
                    <Sidebar>
                      <ChangePassword />
                    </Sidebar>
                  }
                />
                <Route
                  path="/item"
                  element={
                    <Sidebar>
                      <Item />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateItem/:id"
                  element={
                    <Sidebar>
                      <UpdateItem />
                    </Sidebar>
                  }
                />
                <Route
                  path="/pick-up"
                  element={
                    <Sidebar>
                      <Pickup />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updatePickup/:id"
                  element={
                    <Sidebar>
                      <UpdatePickup />
                    </Sidebar>
                  }
                />
                <Route
                  path="/uom"
                  element={
                    <Sidebar>
                      <Uom />
                    </Sidebar>
                  }
                />
                <Route
                  path="/shipper"
                  element={
                    <Sidebar>
                      <Shipper />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateShipper/:id"
                  element={
                    <Sidebar>
                      <UpdateShipper />
                    </Sidebar>
                  }
                />
                <Route
                  path="/consignee"
                  element={
                    <Sidebar>
                      <Consignee />
                    </Sidebar>
                  }
                />

                <Route
                  path="/view-location"
                  element={
                    <Sidebar>
                      <LocationList />
                    </Sidebar>
                  }
                />
                <Route
                  path="/MOC"
                  element={
                    <Sidebar>
                      <Moc />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateLocation/:locationId/addresses/:addressId"
                  element={
                    <Sidebar>
                      <Update />
                    </Sidebar>
                  }
                />
                <Route
                  path="/currency"
                  element={
                    <Sidebar>
                      <Currency />
                    </Sidebar>
                  }
                />
                <Route
                  path="/currency/update/:id"
                  element={
                    <Sidebar>
                      <UpdateCurrency />
                    </Sidebar>
                  }
                />
                <Route
                  path="/brand"
                  element={
                    <Sidebar>
                      <Brand />
                    </Sidebar>
                  }
                />
                <Route
                  path="/brand/edit/:id"
                  element={
                    <Sidebar>
                      <UpdateBrand />
                    </Sidebar>
                  }
                />
                <Route
                  path="/category"
                  element={
                    <Sidebar>
                      <Category />
                    </Sidebar>
                  }
                />
                <Route
                  path="/category/edit/:id"
                  element={
                    <Sidebar>
                      <UpdateCategory />
                    </Sidebar>
                  }
                />
                <Route
                  path="/Items"
                  element={
                    <Sidebar>
                      <ViewItem />
                    </Sidebar>
                  }
                />
                <Route
                  path="/entity"
                  element={
                    <Sidebar>
                      <Entity />
                    </Sidebar>
                  }
                />
                <Route
                  path="/entity/update/:id"
                  element={
                    <Sidebar>
                      <UpdateEntity />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateConsignee/:id"
                  element={
                    <Sidebar>
                      <UpdateConsignee />
                    </Sidebar>
                  }
                />

                <Route
                  path="/add-inventory"
                  element={
                    <Sidebar>
                      <Inventory />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-inventory"
                  element={
                    <Sidebar>
                      <InventoryList />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateInventory/:id"
                  element={
                    <Sidebar>
                      <UpdateInventory />
                    </Sidebar>
                  }
                />
                <Route
                  path="/datacount"
                  element={
                    <Sidebar>
                      <DailyDataCount />
                    </Sidebar>
                  }
                />
              </Route>

              {/*   transfer item*/}

              <Route element={<VerifierandApprover />}>
                <Route
                  path="/"
                  element={
                    <Sidebar>
                      <Dashboard />
                    </Sidebar>
                  }
                />

                <Route
                  path="/dashboard"
                  element={
                    <Sidebar>
                      <Dashboard />
                    </Sidebar>
                  }
                ></Route>
                <Route
                  path="/add-consumeditem"
                  element={
                    <Sidebar>
                      <ConsumeItem />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-consumeditem"
                  element={
                    <Sidebar>
                      <ViewConsume />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateConsumed/:id"
                  element={
                    <Sidebar>
                      <UpdateConsumed />
                    </Sidebar>
                  }
                />
                <Route
                  path="/transfer-item"
                  element={
                    <Sidebar>
                      <TransferItem />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-transfer"
                  element={
                    <Sidebar>
                      <ViewTransfer />
                    </Sidebar>
                  }
                />
                <Route
                  path="/cipl"
                  element={
                    <Sidebar>
                      <Cipl />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-cipl"
                  element={
                    <Sidebar>
                      <ViewCipl />
                    </Sidebar>
                  }
                />
                <Route
                  path="/cipl/createpdf/:id"
                  element={
                    <Sidebar>
                      <PrintCipl />
                    </Sidebar>
                  }
                />
                <Route
                  path="/mto"
                  element={
                    <Sidebar>
                      <Mto />
                    </Sidebar>
                  }
                />
                <Route
                  path="/it"
                  element={
                    <Sidebar>
                      <InternalTransfer />
                    </Sidebar>
                  }
                />

                <Route
                  path="/add-scrappeditem"
                  element={
                    <Sidebar>
                      <ScrappedItem />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-scrappeditem"
                  element={
                    <Sidebar>
                      <ViewScrapp />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateScapped/:id"
                  element={
                    <Sidebar>
                      <UpdateScrapped />
                    </Sidebar>
                  }
                />
                <Route
                  path="/add-incoming"
                  element={
                    <Sidebar>
                      <IncomingStock />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-incoming"
                  element={
                    <Sidebar>
                      <ViewIncoming />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateIncoming/:id"
                  element={
                    <Sidebar>
                      <UpdateIncoming />
                    </Sidebar>
                  }
                />
                <Route
                  path="/singleIncome"
                  element={
                    <Sidebar>
                      <SingleIncome />
                    </Sidebar>
                  }
                />
                <Route
                  path="/bulkIncome"
                  element={
                    <Sidebar>
                      <BulkIncome />
                    </Sidebar>
                  }
                />

                <Route
                  path="/reports"
                  element={
                    <Sidebar>
                      <ReportsDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path="/StockReportDashboard"
                  element={
                    <Sidebar>
                      <StockReportDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path="/searchInventory"
                  element={
                    <Sidebar>
                      <SearchInventory />
                    </Sidebar>
                  }
                />
                <Route
                  path="/searchIncoming"
                  element={
                    <Sidebar>
                      <SearchIncoming />
                    </Sidebar>
                  }
                />
                <Route
                  path="/stockReport"
                  element={
                    <Sidebar>
                      <StockReport />
                    </Sidebar>
                  }
                />
                <Route
                  path="/reportItem"
                  element={
                    <Sidebar>
                      <ReportItem />
                    </Sidebar>
                  }
                />
                <Route
                  path="/locationReport"
                  element={
                    <Sidebar>
                      <LocationReport />
                    </Sidebar>
                  }
                />
                <Route
                  path="/transferItem"
                  element={
                    <Sidebar>
                      <TransferItemDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path="/viewMto"
                  element={
                    <Sidebar>
                      <ViewMto />
                    </Sidebar>
                  }
                />
                <Route
                  path="/mto/createpdf/:id"
                  element={
                    <Sidebar>
                      <PrintMto />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updateMto/:id"
                  element={
                    <Sidebar>
                      <UpdateMto />
                    </Sidebar>
                  }
                />
                <Route
                  path="/viewInternal"
                  element={
                    <Sidebar>
                      <ViewInternal />
                    </Sidebar>
                  }
                />
                <Route
                  path="/updatePickup/:id"
                  element={
                    <Sidebar>
                      <UpdatePickup />
                    </Sidebar>
                  }
                />
                <Route
                  path="/internal/createpdf/:id"
                  element={
                    <Sidebar>
                      <PrintInternal />
                    </Sidebar>
                  }
                />
                <Route
                  path="/Uom/update/:id"
                  element={
                    <Sidebar>
                      <UpdateUom />
                    </Sidebar>
                  }
                />
                <Route
                  path="/masterReport"
                  element={
                    <Sidebar>
                      <MasterReports />
                    </Sidebar>
                  }
                />
                <Route
                  path="/consumeReport"
                  element={
                    <Sidebar>
                      <ConsumeReport />
                    </Sidebar>
                  }
                />
                <Route
                  path="/scrappedReport"
                  element={
                    <Sidebar>
                      <ScrappedReport />
                    </Sidebar>
                  }
                />
                <Route
                  path="/itemService"
                  element={
                    <Sidebar>
                      <ItemServiceReport />
                    </Sidebar>
                  }
                />
                <Route
                  path="/mtoReports"
                  element={
                    <Sidebar>
                      <MtoReports />
                    </Sidebar>
                  }
                />
                <Route
                  path="/itReport"
                  element={
                    <Sidebar>
                      <InternalTransferReport />
                    </Sidebar>
                  }
                />
                <Route
                  path="/ciplReport"
                  element={
                    <Sidebar>
                      <CiplReport />
                    </Sidebar>
                  }
                />
                <Route
                  path="/view-inventoryMoc"
                  element={
                    <Sidebar>
                      <ViewInventoryMoc />
                    </Sidebar>
                  }
                />
              </Route>

              {/* <Route
                path='/consignee/consignee/view'
                element={<ViewConsignee />}
              /> */}
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
