import api from "../../utils/api";
// import { hideLoading, showLoading } from "react-redux-loading-bar";

const ActionType = {
  SET_AUTH_USER_REQUEST: "SET_AUTH_USER_REQUEST",
  SET_AUTH_USER_SUCCESS: "SET_AUTH_USER_SUCCESS",
  SET_AUTH_USER_FAILURE: "SET_AUTH_USER_FAILURE",

  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser() {
  return async (dispatch) => {
    // dispatch(showLoading());
    dispatch({ type: ActionType.SET_AUTH_USER_REQUEST });
    try {
      const authUser = await api.getOwnProfile();
      dispatch({ type: ActionType.SET_AUTH_USER_SUCCESS, payload: authUser });
      // dispatch(hideLoading());
    } catch (error) {
      // dispatch(hideLoading());
      dispatch({
        type: ActionType.SET_AUTH_USER_FAILURE,
        payload: error.message,
      });
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    // dispatch(showLoading());
    dispatch(unsetAuthUserActionCreator());
    api.removeAccessToken();
    // dispatch(hideLoading());
  };
}

export {
  ActionType,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
