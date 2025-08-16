import { createSlice } from "@reduxjs/toolkit";

const loaderInit = {
  isError: false,
  isLoading: false,
  noLoader: false,
  isTokenRequired: true,
};

const loaderSlice = createSlice({
  name: "loader-slice",
  initialState: loaderInit,
  reducers: {
    onLoad: (state) => {
      state.isLoading = true;
    },
    onSuccess: (state) => {
      state.isLoading = false;
    },
    onError: (state) => {
      state.isLoading = false;
    },
    noLoaderHide: (state) => {
      state.noLoader = true;
    },
    noLoaderShow: (state) => {
      state.noLoader = false;
    },
    checkToken: (state) => {
      state.isTokenRequired = false;
    },
  },
});
export { loaderSlice };

export default loaderSlice.reducer;
export const { onError, onLoad, onSuccess, noLoaderHide, noLoaderShow } =
  loaderSlice.actions;
