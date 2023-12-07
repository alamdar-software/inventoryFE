import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slice/CategorySlice";
import locationReducer from "./slice/location";
import UomReducer from "./slice/UomSlice";
import ConsigneeReducer from "./slice/ConsigneeSlice";
import ShipperSlice from "./slice/ShipperSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    category: CategoryReducer,
    consignee: ConsigneeReducer,
    Uom: UomReducer,
    shipper: ShipperSlice,
  },
});
