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
import Cipl from './components/Cipl.js';
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
              <Route path='/' element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />}></Route>
              <Route path='/location/vessel' element={<Location />} />
              <Route path='/item' element={<Item />} />
              <Route path='/pick-up' element={<Pickup />} />
              <Route path='/uom' element={<Uom />} />
              <Route path='/shipper' element={<Shipper />} />
              <Route path='/consignee' element={<Consignee />} />
              <Route path='/Location-Vessel' element={<LocationList />} />
              <Route path='/MOC' element={<Moc />} />
              <Route path='/updateLocation/:id' element={<Update />} />
              <Route path='/currency' element={<Currency />} />
              <Route path='/brand' element={<Brand />} />
              <Route path='/brand/edit/:id' element={<UpdateBrand />} />
              <Route path='/category' element={<Category />} />
              <Route path='/category/edit/:id' element={<UpdateCategory />} />
              <Route path='/transfer-item' element={<TransferItem />} />
              <Route path='/cipl' element={<Cipl />} />
              <Route path='/mto' element={<Mto />} />
              <Route path='/it' element={<InternalTransfer />} />
              <Route
                path='/updateConsignee/:id'
                element={<UpdateConsignee />}
              />
              <Route path='/consume-item' element={<ConsumeItem />} />
              <Route path='/inventory' element={<Inventory />} />
              <Route path='/scrapped-item' element={<ScrappedItem />} />
              <Route path='/incoming-stock' element={<IncomingStock />} />
              <Route path='/singleIncome' element={<SingleIncome />} />
              <Route path='/bulkIncome' element={<BulkIncome />} />

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
