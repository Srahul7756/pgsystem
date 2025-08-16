import {createSlice} from '@reduxjs/toolkit';
import {ThemeMode} from './types';

const themeState: ThemeMode = {
  themeMode: 'blue',
};

const themeSlice = createSlice({
  name: 'Switch Theme',
  initialState: themeState,
  reducers: {
    changeTheme: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export {themeSlice};
export const {changeTheme} = themeSlice.actions;
