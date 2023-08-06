import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userId: JSON.parse(localStorage.getItem("currentUser"))?.userId,
  title: "",
  cat: "",
  cover: "",
  images: "",
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

const addAssetSlice = createSlice({
  name: "addAsset",
  initialState,
  reducers: {
    update: (state, { payload }) => {
      const { name, value } = payload || {};
      state[name] = value;
    },
    addImages: (state, action) => {
      const { cover, images } = action.payload;
      state.cover = cover;
      state.images = images;
    },
    addFeatures: (state, action) => {
      state.features.push(action.payload);
    },
    removeFeature: (state, action) => {
      const featureToRemove = action.payload;
      state.features = state.features.filter(
        (feature) => feature !== featureToRemove
      );
    },
  },
});

export const { update, addImages, addFeatures, removeFeature } =
  addAssetSlice.actions;

export default addAssetSlice.reducer;
