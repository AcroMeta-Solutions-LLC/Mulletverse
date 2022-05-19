import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import marketplaceReducer from "./marketplaceSlice";
import landingReducer from "./landingSlice";

export const rootReducer = combineReducers({
  marketplace: marketplaceReducer,
  landing: persistReducer({ key: "landing", storage }, landingReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export default store;
