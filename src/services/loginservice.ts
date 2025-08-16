import { Dispatch } from "../types/common";
import { navigate, reset } from "../../App";

import { loginLoad, loginError, loginSuccess } from "@store/slices/loginslice";
import baseAPI from "@utils/baseAPI";
import { Alert } from "react-native";
import { TABS } from "@constants/Textkeys";
import { setUser } from "@utils/userUtils";

const loginUser = (payload: any, Navigation: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(loginLoad());

      const response = await baseAPI.post("auth/login", payload);
      console.log('response: ', response);

      await setUser(response.data?.data?.tokens)
      dispatch(loginSuccess(response.data));
      navigate(TABS);


      // You can navigate after success if needed
      // Navigation.navigate('Home');
    } catch (err: any) {
      console.log('err: ', err);
      Alert.alert(JSON.stringify(err));
      dispatch(loginError());
    }
  };
};

export { loginUser };
