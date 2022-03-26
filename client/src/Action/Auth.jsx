import * as api from "../Api/index";
import { SIGN_IN, SIGN_UP } from "./Constant/ActionType";
import Cookies from "js-cookie";

export const signUp = (userData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(userData);
    dispatch({ type: SIGN_UP, payload: data });

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const signIn = (userData, navigate) => async (dispatch) => {
  try {
    console.log(userData);
    const response = await api.signIn(userData);
    dispatch({ type: SIGN_IN, payload: response.data });

    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
};
