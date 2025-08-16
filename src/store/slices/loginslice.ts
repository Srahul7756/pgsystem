import {createSlice} from '@reduxjs/toolkit';

const loginInit = {
  userInfo: {},
  isLoginError: false,
  isLoginLoading: false,
};

const loginSlice = createSlice({
  name: 'login-slice',
  initialState: loginInit,
  reducers: {
    loginLoad: state => {
      state.isLoginLoading = true;
    },
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
      state.isLoginLoading = false;
    },
    loginError: state => {
      state.isLoginError = true;
      state.isLoginLoading = false;
    },
  },
});
export {loginSlice};

export default loginSlice.reducer;
export const {loginError, loginLoad, loginSuccess} = loginSlice.actions;
