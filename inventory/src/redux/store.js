import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slice/CategorySlice";
import locationReducer from "./slice/location";
import UomReducer from "./slice/UomSlice";
import ConsigneeReducer from "./slice/ConsigneeSlice";
import ShipperSlice from "./slice/ShipperSlice";
import pickupSlice from "./slice/PickUpSlice";
import CurrencySlice from "./slice/CurrencySlice";
import ItemSlice from "./slice/ItemSlice";
import BrandSlice from "./slice/BrandSlice";
import entitySlice from "./slice/entitySlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    category: CategoryReducer,
    consignee: ConsigneeReducer,
    Uom: UomReducer,
    shipper: ShipperSlice,
    pickup: pickupSlice,
    currency: CurrencySlice,
    item: ItemSlice,
    brand: BrandSlice,
    entity: entitySlice,
  },
});
