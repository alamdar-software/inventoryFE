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
import UpdateIt from './components/UpdateIt.js';
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
import ConsumeReport from './components/ConsumeReport.js';
import ScrappedReport from './components/ScrappedReport.js';
import ItemServiceReport from './components/ItemServiceReport.js';
import ReportItem from './pages/Reports/ReportItem.js';
import LocationReport from './pages/Reports/locationReport.js';
import TransferItemDashboard from './pages/Dashboards/transferItemDashboard.js';
import MtoReports from './components/MtoReports.js';
import InternalTransferReport from './components/InternalTransferReport.js';
import CiplReport from './components/CiplReport.js';
import UpdatePickup from './components/UpdatePickup.js';
import UpdateUom from './components/UpdateUom.js';
import UpdateItem from './components/UpdateItem.js';
import UpdateConsumed from './pages/UpdateConsumed.js';
import ViewConsume from './pages/ViewConsume.js';
import ViewScrapp from './pages/ViewScrap';
import UpdateScrapped from './pages/UpdateScrapped';
import ViewInventoryMoc from './components/ViewInventoryMoc.js';
import LocationDashboard from './components/LocationDashboard.js';
import Signup from './pages/Login/Signup.jsx';
import Login from './pages/Login/Login.jsx';
import PrivateRoute from './components/PrivateRoute';
import OnlySuperAdmin from './components/OnlySuperAdminRoute';
import ChangePassword from './components/ChangePassword';
import ViewUser from './components/ViewUser';
import UpdateUser from './components/UpdateUser';
import VerifierandApprover from './components/VerifierAndApproverRoute';
import OnlyPreparer from './components/OnlyPreparerRoute';
import OnlyOther from './components/OnlyOthers';
import NeedVerificationDashboard from './components/dashboards/NeedVerificationDashboard.js';
import VerifiedDashboard from './components/dashboards/VerifiedDashboard';
import ApprovedDashboard from './components/dashboards/ApprovedDashboard';
import VerifiedRejected from './components/dashboards/VerifiedRejected';

import ApproverRejected from './components/dashboards/ApproverRejected';
import NeedApprovalDashboard from './components/dashboards/NeedApprovalDashboard';
import ApprovedRejected from './components/dashboards/ApprovedRejected';
import UpdateCipl from './components/UpdateCipl.js';
import ViewCiplVerification from './pages/ViewCiplVerification.js';
import UpdateCiplVerifier from './components/UpdateCiplVerifier.js';
import ViewCiplVerified from './pages/ViewCiplVeried.js';
import ViewCiplRejected from './pages/ViewCiplRejected.js';
import UpdateMtoVerifier from './components/UpdateMtoVerifier.js';
import ViewMtoVerified from './components/ViewMtoVerified.js';
import VerifiedMto from './components/VerifiedMto.js';
import RejectedMto from './components/RejectedMto.js';
import ViewInternalVerifier from './components/ViewInternalVerifier.js';
import UpdateItVerifier from './components/UpdateItVerifier.js';
import ViewInternalVerified from './components/ViewInternalVerified.js';
import ViewInternalRejected from './components/ViewInternalRejected.js';
import ViewIncomingVerifier from './components/ViewIncomingVerifier.js';
import UpdateIncomingVerifier from './components/UpdateIncomingVerifier.js';
import ViewIncomingVerified from './components/ViewIncomingVerified.js';
import ViewIncomingRejected from './components/ViewIncomingRejected.js';
import ViewScrappVerifier from './pages/ViewScrapVerifier.js';
import UpdateScrappedVerifier from './pages/UpdateScrappedVerifier.js';
import ViewScrappVerified from './pages/ViewScrapVerified.js';
import ViewScrappRejected from './pages/ViewScrapRejected.js';
import ViewConsumeCreated from './pages/ViewConsumeCreated.js';
import ViewConsumeVerified from './pages/ViewConsumeVerified.js';
import ViewConsumeRejected from './pages/ViewConsumeRejected.js';
import UpdateConsumedVerifier from './pages/UpdateConsumedVerifier.js';
import ViewCiplApproval from './pages/ViewCiplApproval.js';

import UpdateMtoApproval from './components/UpdateMtoApproval.js';
import UpdateCiplApproval from './components/UpdateCiplApproval.js';
import ViewInternalApproval from './components/ViewInternalApproval.js';
import UpdateItApproval from './components/UpdateItApproval.js';
import ViewScrapApproval from './pages/ViewScrapApproval.js';
import UpdateScrappedApproval from './pages/UpdateScrappedApproval.js';
import ViewMtoApproval from './components/ViewMtoApproval.js';
import ViewConsumeApproval from './pages/ViewConsumeApproval.js';
import UpdateConsumedApproval from './pages/UpdateConsumedApproval.js';
import ApprovalCiplRejected from './pages/ApprovalCiplRejected.js';
import ApprovalMtoRejected from './components/ApprovalMtoRejected.js';
import ApprovalInternalrejected from './components/ApprovalInternalRejected.js';
import ApprovalScrapRejected from './pages/ApprovalScrapRejected.js';
import ApprovalConsumeRejected from './pages/ApprovalConsumeRejected.js';
import ApprovalIncomingRejected from './components/ApprovalIncomungRejected.js';
import ApprovedCipl from './pages/ApprovedCipl.js';
import ApprovedInternal from './components/ApprovedInternal.js';
import ApprovedIncoming from './components/ApprovedIncoming.js';
import ApprovedScrapped from './pages/ApprovedScrapped.js';
import ApprovedConsumed from './pages/ApprovedConsumed.js';
import ApprovalIncoming from './components/ApprovalIncoming.js';
import UpdateIncomingApproval from './components/UpdateIncomingApproval.js';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { TableContainer } from '@mui/material';
import ItemInventory from './components/ItemInventory.js';
import ViewPickup from './components/ViewPickup.js';
import ReportLocation from './components/ReportLocation.js';

const theme = createTheme({
  palette: {
    background: {
      default: 'rgb(241, 245, 241)',
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


            <Route path='/login' element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route element={<OnlySuperAdmin />}>
                <Route
                  path='/add-user'
                  element={
                    <Sidebar>
                      <Signup />
                    </Sidebar>
                  }
                />
                <Route
                  path='/view-user'
                  element={
                    <Sidebar>
                      <ViewUser />
                    </Sidebar>
                  }
                />
                <Route
                  path='/api/user/update/:id'
                  element={
                    <Sidebar>
                      <UpdateUser />
                    </Sidebar>
                  }
                />
              </Route>

              <Route element={<OnlyPreparer />}>
                <Route
                  path='/add-location'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Location />
                    </Sidebar>
                  }
                />
                <Route
                  path='/change-password'
                  element={
                    <Sidebar>
                      <ChangePassword />
                    </Sidebar>
                  }
                />
                <Route
                  path='/add-item'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Item />
                    </Sidebar>
                  }
                />
                  <Route
                  path='item/viewInventories/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ItemInventory />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateItem/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateItem />
                    </Sidebar>
                  }
                />

                <Route
                  path='/pick-up'
                  element={
                    <Sidebar>
                      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
{/* Same as */}
                      <Pickup />
<ToastContainer />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updatePickup/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdatePickup />
                    </Sidebar>
                  }
                />
                <Route
                  path='/uom'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Uom />
                    </Sidebar>
                  }
                />
                <Route
                  path='/shipper'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Shipper />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateShipper/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateShipper />
                    </Sidebar>
                  }
                />
                <Route
                  path='/consignee'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Consignee />
                    </Sidebar>
                  }
                />

                <Route
                  path='/view-location'
                  element={
                    <Sidebar>
                      <LocationList />
                    </Sidebar>
                  }
                />
                 <Route
                  path='/view-pickup'
                  element={
                    <Sidebar>
                      <ViewPickup />
                    </Sidebar>
                  }
                />
                <Route
                  path='/MOC'
                  element={
                    <Sidebar>
                      <Moc />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateLocation/:locationId'
                  element={
                    <Sidebar>
                      <Update />
                    </Sidebar>
                  }
                />
                <Route
                  path='/currency'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Currency />
                    </Sidebar>
                  }
                />
                <Route
                  path='/currency/update/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateCurrency />
                    </Sidebar>
                  }
                />
                <Route
                  path='/brand'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Brand />
                    </Sidebar>
                  }
                />
                <Route
                  path='/brand/edit/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateBrand />
                    </Sidebar>
                  }
                />
                <Route
                  path='/category'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Category />
                    </Sidebar>
                  }
                />
                <Route
                  path='/category/edit/:id'
                  element={
                    <Sidebar>
                       <ToastContainer/>
                      <UpdateCategory />
                    </Sidebar>
                  }
                />
                <Route
                  path='/view-item'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ViewItem />
                    </Sidebar>
                  }
                />
                <Route
                  path='/entity'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Entity />
                    </Sidebar>
                  }
                />
                <Route
                  path='/entity/update/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateEntity />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateConsignee/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateConsignee />
                    </Sidebar>
                  }
                />

                <Route
                  path='/datacount'
                  element={
                    <Sidebar>
                      <DailyDataCount />
                    </Sidebar>
                  }
                />
              </Route>

              <Route
                path='/pick-up'
                element={
                  <Sidebar>
                    <ToastContainer/>
                    <Pickup />
                  </Sidebar>
                }
              />
              {/*   transfer item*/}

              <Route element={<VerifierandApprover />||<OnlyPreparer />}>
              <Route
                  path='/updateIncoming/:id'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <UpdateIncoming />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateIncoming-verifier/:id'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <UpdateIncomingVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/add-inventory'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Inventory />
                    </Sidebar>
                  }
                />
                <Route
                  path='/cipl'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Cipl />
                    </Sidebar>
                  }
                />
                <Route
                  path='/view-cipl'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ViewCipl />
                    </Sidebar>
                  }
                />
                <Route
                  path='/cipl-created'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ViewCiplVerification />
                    </Sidebar>
                  }
                />
                <Route
                  path='/viewCiplApproval'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ViewCiplApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/verified-cipl'
                  element={
                    <Sidebar>
                      <ViewCiplVerified />
                    </Sidebar>
                  }
                />

                <Route
                  path='/rejected-cipl'
                  element={
                    <Sidebar>
                      <ViewCiplRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/mto-created'
                  element={
                    <Sidebar>
                      <ViewMtoVerified />
                    </Sidebar>
                  }
                />
                <Route
                  path='/verified-mto'
                  element={
                    <Sidebar>
                      <VerifiedMto />
                    </Sidebar>
                  }
                />
                <Route
                  path='/ViewMtoApproval'
                  element={
                    <Sidebar>
                      <ViewMtoApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/ViewConsumeApproval'
                  element={
                    <Sidebar>
                      <ViewConsumeApproval />
                    </Sidebar>
                  }
                />

                <Route
                  path='/rejected-mto'
                  element={
                    <Sidebar>
                      <RejectedMto />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvedMto'
                  element={
                    <Sidebar>
                      <RejectedMto />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvedInternal'
                  element={
                    <Sidebar>
                      <ApprovedInternal />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvedIncoming'
                  element={
                    <Sidebar>
                      <ApprovedIncoming />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvedScrap'
                  element={
                    <Sidebar>
                      <ApprovedScrapped />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvedConsumed'
                  element={
                    <Sidebar>
                      <ApprovedConsumed />
                    </Sidebar>
                  }
                />
                <Route
                  path='/needApproval'
                  element={
                    <Sidebar>
                      <ApprovalIncoming />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateMtoVerified/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateMtoVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateMtoApproval/:id'
                  element={
                    <Sidebar>
                      <UpdateMtoApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateCipl/:id'
                  element={
                    <Sidebar>
                      <UpdateCipl />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateCiplverifier/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateCiplVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateCiplApproval/:id'
                  element={
                    <Sidebar>
                      <UpdateCiplApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateIncomingApproval/:id'
                  element={
                    <Sidebar>
                      <UpdateIncomingApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/it-created'
                  element={
                    <Sidebar>
                      <ViewInternalVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/viewInternalApproval'
                  element={
                    <Sidebar>
                      <ViewInternalApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/viewScrapApproval'
                  element={
                    <Sidebar>
                      <ViewScrapApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvalCiplRejected'
                  element={
                    <Sidebar>
                      <ApprovalCiplRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvalMtoRejected'
                  element={
                    <Sidebar>
                      <ApprovalMtoRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvalItRejected'
                  element={
                    <Sidebar>
                      <ApprovalInternalrejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvalScrapRejected'
                  element={
                    <Sidebar>
                      <ApprovalScrapRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvalConsumeRejected'
                  element={
                    <Sidebar>
                      <ApprovalConsumeRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approvalIncomingRejected'
                  element={
                    <Sidebar>
                      <ApprovalIncomingRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/ApprovedCipl'
                  element={
                    <Sidebar>
                      <ApprovedCipl />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateIt/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateIt />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateItVerifier/:id'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <UpdateItVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateItApproval/:id'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <UpdateItApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateScrappedApproval/:id'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <UpdateScrappedApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateConsumedApproval/:id'
                  element={
                    <Sidebar>
                      <UpdateConsumedApproval />
                    </Sidebar>
                  }
                />
                <Route
                  path='/verified-it'
                  element={
                    <Sidebar>
                      <ViewInternalVerified />
                    </Sidebar>
                  }
                />
                <Route
                  path='/rejected-it'
                  element={
                    <Sidebar>
                      <ViewInternalRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/cipl/createpdf/:id/:companyName'
                  element={
                    <Sidebar>
                      <PrintCipl />
                    </Sidebar>
                  }
                />
                <Route
                  path='/need-verfication'
                  element={
                    <Sidebar>
                      <NeedVerificationDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path='/need-approval'
                  element={
                    <Sidebar>
                      <NeedApprovalDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path='/verfied'
                  element={
                    <Sidebar>
                      <VerifiedDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approved'
                  element={
                    <Sidebar>
                      <ApprovedDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path='/verified-rejected'
                  element={
                    <Sidebar>
                      <VerifiedRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approved-rejected'
                  element={
                    <Sidebar>
                      <ApprovedRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/approver-rejected'
                  element={
                    <Sidebar>
                      <ApproverRejected />
                    </Sidebar>
                  }
                />

                <Route
                  path='/view-inventory'
                  element={
                    <Sidebar>
                      <InventoryList />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateInventory/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateInventory />
                    </Sidebar>
                  }
                />
                <Route
                  path='/add-consumeditem'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ConsumeItem />
                    </Sidebar>
                  }
                />
                <Route
                  path='/view-consumeditem'
                  element={
                    <Sidebar>
                      <ViewConsume />
                    </Sidebar>
                  }
                />
                <Route
                  path='/consumed-created'
                  element={
                    <Sidebar>
                      <ViewConsumeCreated />
                    </Sidebar>
                  }
                />
                <Route
                  path='/verified-consumed'
                  element={
                    <Sidebar>
                      <ViewConsumeVerified />
                    </Sidebar>
                  }
                />
                <Route
                  path='/rejected-consumedstock'
                  element={
                    <Sidebar>
                      <ViewConsumeRejected />
                    </Sidebar>
                  }
                />

                <Route
                  path='/updateConsumed/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateConsumed />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateConsumed-Verifier/:id'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <UpdateConsumedVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/transfer-item'
                  element={
                    <Sidebar>
                      <TransferItem />
                    </Sidebar>
                  }
                />
                <Route
                  path='/view-transfer'
                  element={
                    <Sidebar>
                      <ViewTransfer />
                    </Sidebar>
                  }
                />

                <Route
                  path='/mto'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <Mto />
                    </Sidebar>
                  }
                />
                <Route
                  path='/it'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <InternalTransfer />
                    </Sidebar>
                  }
                />

                <Route
                  path='/add-scrappeditem'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ScrappedItem />
                    </Sidebar>
                  }
                />
                <Route
                  path='/view-scrappeditem'
                  element={
                    <Sidebar>
                      <ViewScrapp />
                    </Sidebar>
                  }
                />
                <Route
                  path='/scrapped-created'
                  element={
                    <Sidebar>
                      <ViewScrappVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateScapped/:id'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <UpdateScrapped />
                    </Sidebar>
                  }
                />
                <Route
                  path='/verified-scrapped'
                  element={
                    <Sidebar>
                      <ViewScrappVerified />
                    </Sidebar>
                  }
                />
                <Route
                  path='/rejected-scrapped'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <ViewScrappRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/updateScapped-verifier/:id'
                  element={
                    <Sidebar>
                         <ToastContainer/>
                      <UpdateScrappedVerifier />
                    </Sidebar>
                  }
                />
                <Route
                  path='/add-incoming'
                  element={
                    <Sidebar>
                      <IncomingStock />
                    </Sidebar>
                  }
                />
                <Route
                  path='/view-incoming'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <ViewIncoming />
                    </Sidebar>
                  }
                />
                <Route
                  path='/incoming-created'
                  element={
                    <Sidebar>
                      <ViewIncomingVerifier />
                    </Sidebar>
                  }
                />
            
                <Route
                  path='/verified-incoming'
                  element={
                    <Sidebar>
                      <ViewIncomingVerified />
                    </Sidebar>
                  }
                />
                <Route
                  path='/rejected-incomingstock'
                  element={
                    <Sidebar>
                      <ViewIncomingRejected />
                    </Sidebar>
                  }
                />
                <Route
                  path='/singleIncome'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <SingleIncome />
                    </Sidebar>
                  }
                />
                <Route
                  path='/bulkIncome'
                  element={
                    <Sidebar>
                      <ToastContainer/>
                      <BulkIncome />
                    </Sidebar>
                  }
                />

                <Route
                  path='/reports'
                  element={
                    <Sidebar>
                      <ReportsDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path='/StockReportDashboard'
                  element={
                    <Sidebar>
                      <StockReportDashboard />
                    </Sidebar>
                  }
                />
                <Route
                  path='/searchInventory'
                  element={
                    <Sidebar>
                      <SearchInventory />
                    </Sidebar>
                  }
                />
                <Route
                  path='/searchIncoming'
                  element={
                    <Sidebar>
                      <SearchIncoming />
                    </Sidebar>
                  }
                />

                <Route element={<OnlyOther />}>
                  <Route path='/login' element={<Login />} />
                  <Route
                    path='/'
                    element={
                      <Sidebar>
                        <Dashboard />
                      </Sidebar>
                    }
                  />

                  <Route
                    path='/dashboard'
                    element={
                      <Sidebar>
                        <Dashboard />
                      </Sidebar>
                    }
                  ></Route>
                    <Route
                    path='/'
                    element={
                      <Sidebar>
                        <Dashboard />
                      </Sidebar>
                    }
                  ></Route>
                  <Route
                    path='/stockReport'
                    element={
                      <Sidebar>
                        <StockReport />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/reportItem'
                    element={
                      <Sidebar>
                        <ReportItem />
                      </Sidebar>
                    }
                  />
                   <Route
                    path='/reportLocation'
                    element={
                      <Sidebar>
                        <ReportLocation />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/locationReport'
                    element={
                      <Sidebar>
                        <LocationReport />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/transferItem'
                    element={
                      <Sidebar>
                        <TransferItemDashboard />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/viewMto'
                    element={
                      <Sidebar>
                        <ViewMto />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/mto/createpdf/:id/:companyName'
                    element={
                      <Sidebar>
                        <PrintMto />
                      </Sidebar>
                    }
                  />
                    {/* <Route
                    path='/mto/createpdf/:id/:companyName'
                    element={
                      <Sidebar>
                        <PrintMto />
                      </Sidebar>
                    }
                  /> */}
                   <Route
                    path='/mto/createpdf/:id/'
                    element={
                      <Sidebar>
                        <PrintMto />
                      </Sidebar>
                    }
                  />
                  {/* <Route path="/mto/createpdf/:id/:companyName" element={<PrintMto />} /> */}
                  <Route
                    path='/updateMto/:id'
                    element={
                      <Sidebar>
                        <ToastContainer/>
                        <UpdateMto />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/viewInternal'
                    element={
                      <Sidebar>
                        <ViewInternal />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/updatePickup/:id'
                    element={
                      <Sidebar>
                        <ToastContainer/>
                        <UpdatePickup />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/internal/createpdf/:id/:companyName'
                    element={
                      <Sidebar>
                        <PrintInternal />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/Uom/update/:id'
                    element={
                      <Sidebar>
                        <ToastContainer/>
                        <UpdateUom />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/masterReport'
                    element={
                      <Sidebar>
                        <MasterReports />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/consumeReport'
                    element={
                      <Sidebar>
                        <ConsumeReport />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/scrappedReport'
                    element={
                      <Sidebar>
                        <ScrappedReport />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/itemService'
                    element={
                      <Sidebar>
                        <ItemServiceReport />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/mtoReports'
                    element={
                      <Sidebar>
                        <MtoReports />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/itReport'
                    element={
                      <Sidebar>
                        <InternalTransferReport />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/ciplReport'
                    element={
                      <Sidebar>
                        <CiplReport />
                      </Sidebar>
                    }
                  />
                  <Route
                    path='/view-inventoryMoc'
                    element={
                      <Sidebar>
                        <ViewInventoryMoc />
                      </Sidebar>
                    }
                  />
                </Route>
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
