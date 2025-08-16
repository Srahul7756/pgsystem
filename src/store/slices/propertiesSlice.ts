import { createSlice } from '@reduxjs/toolkit';

const propertiesInit = {
  data: [],            // list of properties
  isPropertiesLoading: false,
  isPropertiesError: false,
};

const propertiesSlice = createSlice({
  name: 'properties-slice',
  initialState: propertiesInit,
  reducers: {
    getPropertiesLoad: (state) => {
      state.isPropertiesLoading = true;
      state.isPropertiesError = false;
    },
    getPropertiesSuccess: (state, action) => {
      state.data = action.payload; // assuming payload is an array of properties
      state.isPropertiesLoading = false;
      state.isPropertiesError = false;
    },
    getPropertiesError: (state) => {
      state.isPropertiesLoading = false;
      state.isPropertiesError = true;
    },
    clearProperties: (state) => {
      state.data = [];
      state.isPropertiesError = false;
      state.isPropertiesLoading = false;
    }
  },
});

export { propertiesSlice };

export default propertiesSlice.reducer;
export const {
  getPropertiesLoad,
  getPropertiesSuccess,
  getPropertiesError,
  clearProperties
} = propertiesSlice.actions;
