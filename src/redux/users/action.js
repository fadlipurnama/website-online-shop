import api from "../../utils/api";
import { asyncSetAuthUser } from "../authUser/action";

const ActionType = {
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",

  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  RECEIVE_USERS: "RECEIVE_USERS",

  CLEAR_STATE: "CLEAR_STATE",
};

const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const asyncLoginUser = (email, password) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.LOGIN_REQUEST });
    try {
      const login = await api.login({
        email,
        password,
      });
      dispatch(asyncSetAuthUser(login.authToken));
      dispatch({ type: ActionType.LOGIN_SUCCESS, payload: login });
    } catch (error) {
      dispatch({
        type: ActionType.LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
};

const asyncRegisterUser = (
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
) => {
  return async (dispatch) => {
    dispatch({ type: ActionType.REGISTER_REQUEST });
    try {
      const register = await api.register({
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
      });
      dispatch({ type: ActionType.REGISTER_SUCCESS, payload: register });
    } catch (error) {
      dispatch({
        type: ActionType.REGISTER_FAILURE,
        payload: error.message,
      });
    }
  };
};

const clearState = () => ({
  type: ActionType.CLEAR_STATE,
});

export {
  ActionType,
  clearState,
  asyncLoginUser,
  asyncRegisterUser,
  receiveUsersActionCreator,
};
