import {themeSlice} from '../actions';
import {combineReducers} from '@reduxjs/toolkit';
import {errorSlice} from '@store/slices/errorslice';
import {loaderSlice} from '@store/slices/loaderslice';
import {fontSlice} from '@store/slices/fontslice';
import {loginSlice} from '@store/slices/loginslice';
import { propertiesSlice } from '@store/slices/propertiesSlice';
import { roomsSlice } from '@store/slices/roomsSlice';

export const rootReducer = combineReducers({
  themeMode: themeSlice.reducer,
  fontConfig: fontSlice.reducer,
  errorReducer: errorSlice.reducer,
  loaderReducer: loaderSlice.reducer,
  loginReducer: loginSlice.reducer,
  getPropertiesReducer:propertiesSlice.reducer,
  getRoomsReducer: roomsSlice.reducer, 
});
