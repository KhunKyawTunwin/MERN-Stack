import { configureStore } from "@reduxjs/toolkit";
import addAssetReducer from "./addasset/addassetSlice";

export const store = configureStore({
  reducer: {
    addAsset: addAssetReducer.reducer,
  },
});
