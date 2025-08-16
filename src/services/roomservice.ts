import { getRoomsError, getRoomsLoad, getRoomsSuccess } from "@store/slices/roomsSlice";
import baseAPI from "@utils/baseAPI";
import { Dispatch } from "@utils/commonTypes";
import { Alert } from "react-native";

const addRoom = (payload: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await baseAPI.post("pg/rooms", payload);
      console.log('response: ', response);
    } catch (err: any) {
      console.log('err: ', err);
      Alert.alert(JSON.stringify(err));
      // Handle error response if needed
    }
  };
};

const getRooms = (propertyId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getRoomsLoad());
    try {
      const response = await baseAPI.get(`pg/rooms`);  
      if (response.data) {
        dispatch(getRoomsSuccess(response.data?.data));
      }
    } catch (err: any) {
      dispatch(getRoomsError());
      Alert.alert(JSON.stringify(err));
    }
  };
};

export { addRoom,getRooms };