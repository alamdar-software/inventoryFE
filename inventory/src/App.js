import Dashboard from './components/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Location } from './components/Location';
import Sidebar from './components/Sidebar.jsx';
import Item from './components/Item.js';
import Pickup from './components/Pickup.js';
import Uom from './components/Uom.js';
import Shipper from './components/Shipper.js';
import Consignee from './components/Consignee.js';

import { Currency } from './components/Currency.jsx';
import LocationList from './components/LocationList.js';
import Moc from './pages/Moc.jsx';
import Update from './components/Update.js';
import Brand from './pages/Brand';
import UpdateBrand from './pages/UpdateBrand';
import Category from './pages/Category';
import UpdateCategory from './pages/UpdateCategory';
import TransferItem from './pages/TransferItem.js';

import Mto from './components/Mto.js';
import InternalTransfer from './components/InternalTransfer.js';
import ViewConsignee from './pages/ViewConsignee';
import UpdateConsignee from './components/UpdateConsignee.js';
import ConsumeItem from './components/ConsumeItem.js';
import Inventory from './components/Inventory.js';
import ScrappedItem from './components/ScrappedItem.js';
import IncomingStock from './pages/IncomingStock.js';
import SingleIncome from './components/SingleIncome.js';
import BulkIncome from './components/BulkIncome.js';
import User from './components/User.js';
import DailyDataCount from './pages/DailyDataCount.js';
import UpdateCurrency from './pages/UpdateCurrency';
import UpdateShipper from './components/UpdateShipper';
import ViewItem from './components/ViewItem.js';
import Cipl from './components/Cipl.js';
import ViewCipl from './pages/ViewCipl';
import PrintCipl from './pages/PrintCipl';
import ViewTransfer from './pages/ViewTransfer';
import UpdateEntity from './components/UpdateEntity';
import Entity from './pages/Entity';
import InventoryList from './components/InventoryList.js';
import UpdateInventory from './components/UpdateInventory.js';
import ViewIncoming from './components/ViewIncoming.js';
import UpdateIncoming from './components/UpdateIncoming.js';
import ReportsDashboard from './pages/ReportsDashboard';
import StockReportDashboard from './pages/StockReportDashboard';
import SearchInventory from './pages/SearchInventory';
import SearchIncoming from './pages/SearchIncoming';
import StockReport from './pages/StockReport';
import ViewMto from './components/ViewMto.js';
import PrintMto from './components/PrintMto.js';
import UpdateMto from './components/UpdateMto.js';
import ViewInternal from './components/ViewInternal.js';
import PrintInternal from './components/PrintInternal.js';
import MasterReports from './components/MasterReports.js';
const theme = createTheme({
  palette: {
    background: {
      default: 'rgb(241, 245, 241)',
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
              <Route path='/' element={<Dashboard />} />
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/add-location' element={<Location />} />
              <Route path='/item' element={<Item />} />
              <Route path='/pick-up' element={<Pickup />} />
              <Route path='/updatePickup/:id' element={<Pickup />} />
              <Route path='/uom' element={<Uom />} />
              <Route path='/shipper' element={<Shipper />} />

              <Route path='/updateShipper/:id' element={<UpdateShipper />} />
              <Route path='/consignee' element={<Consignee />} />
              <Route path='/view-location' element={<LocationList />} />
              <Route path='/MOC' element={<Moc />} />
              <Route
                path='/updateLocation/:locationId/addresses/:addressId'
                element={<Update />}
              />
              <Route path='/currency' element={<Currency />} />
              <Route path='/currency/update/:id' element={<UpdateCurrency />} />
              <Route path='/brand' element={<Brand />} />
              <Route path='/brand/edit/:id' element={<UpdateBrand />} />
              <Route path='/category' element={<Category />} />
              <Route path='/category/edit/:id' element={<UpdateCategory />} />
              <Route path='/transfer-item' element={<TransferItem />} />
              <Route path='/view-transfer' element={<ViewTransfer />} />
              <Route path='/cipl' element={<Cipl />} />
              <Route path='/view-cipl' element={<ViewCipl />} />
              <Route path='/cipl/createpdf/:id' element={<PrintCipl />} />

              <Route path='/mto' element={<Mto />} />
              <Route path='/it' element={<InternalTransfer />} />
              <Route path='/Items' element={<ViewItem />} />
              <Route path='/entity' element={<Entity />} />

              <Route
                path='/updateConsignee/:id'
                element={<UpdateConsignee />}
              />
              <Route path='/add-consumeditem' element={<ConsumeItem />} />
              <Route path='/add-inventory' element={<Inventory />} />
              <Route path='/view-inventory' element={<InventoryList />} />
              <Route
                path='/updateInventory/:id'
                element={<UpdateInventory />}
              />
              <Route path='/scrapped-item' element={<ScrappedItem />} />
              <Route path='/add-incoming' element={<IncomingStock />} />
              <Route path='/view-incoming' element={<ViewIncoming />} />
              <Route path='/updateIncoming/:id' element={<UpdateIncoming />} />
              <Route path='/singleIncome' element={<SingleIncome />} />
              <Route path='/bulkIncome' element={<BulkIncome />} />
              <Route path='/user' element={<User />} />
              <Route path='/datacount' element={<DailyDataCount />} />
              <Route path='/reports' element={<ReportsDashboard />} />
              <Route
                path='/StockReportDashboard'
                element={<StockReportDashboard />}
              />
              <Route path='/searchInventory' element={<SearchInventory />} />
              <Route path='/searchIncoming' element={<SearchIncoming />} />
              <Route path='/stockReport' element={<StockReport />} />

              <Route path='/viewMto' element={<ViewMto />} />
              <Route path='/mto/createpdf/:id' element={<PrintMto />} />
              <Route path='/updateMto/:id' element={<UpdateMto />} />
              <Route path='/viewInternal' element={<ViewInternal />} />
              <Route
                path='/internal/createpdf/:id'
                element={<PrintInternal />}
              />
              <Route path='/masterReport' element={<MasterReports />} />
              {/* <Route
                path='/consignee/consignee/view'
                element={<ViewConsignee />}
              /> */}
            </Routes>
          </ThemeProvider>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
