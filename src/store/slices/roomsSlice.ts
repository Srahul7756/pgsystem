import { createSlice } from '@reduxjs/toolkit';

const roomsInit = {
  data: [],            // list of rooms
  isRoomsLoading: false,
  isRoomsError: false,
};

const roomsSlice = createSlice({
  name: 'rooms-slice',
  initialState: roomsInit,
  reducers: {
    getRoomsLoad: (state) => {
      state.isRoomsLoading = true;
      state.isRoomsError = false;
    },
    getRoomsSuccess: (state, action) => {
      state.data = action.payload; // assuming payload is an array of rooms
      state.isRoomsLoading = false;
      state.isRoomsError = false;
    },
    getRoomsError: (state) => {
      state.isRoomsLoading = false;
      state.isRoomsError = true;
    },
    clearRooms: (state) => {
      state.data = [];
      state.isRoomsError = false;
      state.isRoomsLoading = false;
    }
  },
});

export { roomsSlice };

export default roomsSlice.reducer;
export const {
  getRoomsLoad,
  getRoomsSuccess,
  getRoomsError,
  clearRooms
} = roomsSlice.actions;
