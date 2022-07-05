import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import marketplaceReducer from "./marketplaceSlice";
import portfolioReducer from "./portfolioSlice";
import landingReducer from "./landingSlice";
import tokenReducer from "./tokenSlice";
import leaderboardReducer from "./leaderboardSlice";
import themeReducer from "./themeSlice";
import searchReducer from "./searchSlice";
import profileReducer from "./profileSlice";
import accountReducer from "./accountSlice";
import listingReducer from "./listingSlice";
import collectionReducer from "./collectionSlice";

export const rootReducer = combineReducers({
  marketplace: marketplaceReducer,
  token: tokenReducer,
  leaderboard: leaderboardReducer,
  search: searchReducer,
  listing: listingReducer,
  collection: collectionReducer,
  account: persistReducer({ key: "account", storage }, accountReducer),
  profile: persistReducer({ key: "profile", storage }, profileReducer),
  theme: persistReducer({ key: "theme", storage }, themeReducer),
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
