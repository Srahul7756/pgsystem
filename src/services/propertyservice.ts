import { Dispatch } from "../types/common";
import { navigate, reset } from "../../App";

import { loginLoad, loginError, loginSuccess } from "@store/slices/loginslice";
import baseAPI from "@utils/baseAPI";
import { Alert } from "react-native";
import { TABS } from "@constants/Textkeys";
import { getPropertiesError, getPropertiesLoad, getPropertiesSuccess } from "@store/slices/propertiesSlice";
import { getRoomsError, getRoomsLoad, getRoomsSuccess } from "@store/slices/roomsSlice";

const getProperties = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(getPropertiesLoad());
      const response = await baseAPI.get("pg/properties");
      dispatch(getPropertiesSuccess(response.data?.data));
    } catch (err: any) {
      Alert.alert(JSON.stringify(err));
      dispatch(getPropertiesError());
    }
  };
};



export { getProperties };
