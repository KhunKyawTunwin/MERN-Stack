import { configureStore } from "@reduxjs/toolkit";
// import addAssetReducer from "./addasset/addassetSlice";
import authReducer from "./auth/authSlice";
import { apiSlice } from "./app/apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
