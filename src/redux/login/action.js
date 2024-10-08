import api from "../../utils/api";
import { asyncSetAuthUser } from "../authUser/action";

const ActionType = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  UNSET_AUTH_USER: "UNSET_AUTH_USER",
  CLEAR_STATE: "CLEAR_STATE",
};

const asyncLoginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.LOGIN_REQUEST });
    try {
      const { authToken } = await api.login({
        email,
        password,
      });
      api.putAccessToken(authToken);
      dispatch(asyncSetAuthUser(authToken));
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: authToken });
    } catch (error) {
      dispatch({
        type: ActionType.LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};

const clearStateLogin = () => ({
  type: ActionType.CLEAR_STATE,
});

export { ActionType, asyncLoginUser, clearStateLogin };
