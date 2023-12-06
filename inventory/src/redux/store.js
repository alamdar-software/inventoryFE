import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./slice/CategorySlice";
import locationReducer from "./slice/location";
import UomReducer from "./slice/UomSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    category: CategoryReducer,
    Uom: UomReducer,
  },
});
