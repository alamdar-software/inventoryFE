import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slice/UserSlice';
import CategoryReducer from './slice/CategorySlice';
import locationReducer from './slice/location';
import UomReducer from './slice/UomSlice';
import ConsigneeReducer from './slice/ConsigneeSlice';
import ShipperSlice from './slice/ShipperSlice';
import pickupSlice from './slice/PickUpSlice';
import CurrencySlice from './slice/CurrencySlice';
import ItemSlice from './slice/ItemSlice';
import BrandSlice from './slice/BrandSlice';
import entitySlice from './slice/entitySlice';
import SingleIncomeSlice from './slice/SingleIncomeSlice';
import InventorySlice from './slice/InventorySlice';
import ConsumeItemSlice from './slice/ConsumeItemSlice';

// Combine the reducers from both stores
const rootReducer = combineReducers({
  // Redux Persisted store reducers
  persisted: persistReducer(
    {
      key: 'root',
      storage,
      version: 1,
    },
    combineReducers({
      user: userReducer,
    })
  ),

  // Non-persisted store reducers
  nonPersisted: combineReducers({
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
    singleIncome: SingleIncomeSlice,
    inventory: InventorySlice,
    consumedItem: ConsumeItemSlice,
  }),
});

// Create the global store
export const store = configureStore({
  reducer: rootReducer, // Use rootReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disables the serializable check
    }),
});

// Initialize Redux Persist
export const persistor = persistStore(store); // Use persistor instead of persist
