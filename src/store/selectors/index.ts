import {rootReducer} from '../reducer';

export type RootState = ReturnType<typeof rootReducer>;

export const fontSelector = (state: RootState) => state.fontConfig;
export const themeSelector = (state: RootState) => state.themeMode;
export const loaderSelector = (state: RootState) => state.loaderReducer;
export const errorSelector = (state: RootState) => state.errorReducer;
export const loginSelector = (state: RootState) => state.loginReducer;
export const getPropertiesSelector = (state:RootState) => state.getPropertiesReducer;
export const getRoomsSelector = (state:RootState) => state.getRoomsReducer;