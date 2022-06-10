import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import marketplaceReducer from "./marketplaceSlice";
import portfolioReducer from "./portfolioSlice";
import landingReducer from "./landingSlice";
import tokenReducer from "./tokenSlice";
import leaderboardReducer from "./leaderboardSlice";

export const rootReducer = combineReducers({
  marketplace: marketplaceReducer,
  token: tokenReducer,
  leaderboard: leaderboardReducer,
  landing: persistReducer({ key: "landing", storage }, landingReducer),
  portfolio: persistReducer({ key: "portfolio", storage }, portfolioReducer),
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
