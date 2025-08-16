import { createSlice } from "@reduxjs/toolkit";

const fontInit = {
  font: "",
  error: false,
  isFontLoading: false,
};

const fontSlice = createSlice({
  name: "font-slice",
  initialState: fontInit,
  reducers: {
    fontLoad: (state) => {
      state.isFontLoading = true;
    },
    setFont: (state, action) => {
      state.font = action.payload;
      state.isFontLoading = false;
    },
  },
});
export { fontSlice };

export default fontSlice.reducer;
export const { fontLoad, setFont } = fontSlice.actions;
