import api from "../../utils/api";
// import { asyncSetAuthUser } from "../loginUser/action";

const ActionType = {
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",

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

// const asyncLoginUser = (email, password) => {
//   return async (dispatch) => {
//     dispatch({ type: ActionType.LOGIN_REQUEST });
//     try {
//       const { authToken } = await api.login({
//         email,
//         password,
//       });
//       api.putAccessToken(authToken);
//       dispatch(asyncSetAuthUser(authToken));
//       dispatch({ type: ActionType.LOGIN_SUCCESS, payload: authToken });
//     } catch (error) {
//       dispatch({
//         type: ActionType.LOGIN_FAILURE,
//         payload: error.message,
//       });
//     }
//   };
// };

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

const clearStateRegister = () => ({
  type: ActionType.CLEAR_STATE,
});

export {
  ActionType,
  clearStateRegister,
  // asyncLoginUser,
  asyncRegisterUser,
  receiveUsersActionCreator,
};
