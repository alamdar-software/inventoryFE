import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/UserSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import version from "nodemon/lib/version";
import themeReducer from "./Slice/ThemeSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persist = persistStore(Store);
