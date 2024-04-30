import api from "../../utils/api";

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

function asyncSetAuthUser(token) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_AUTH_USER_REQUEST });
    try {
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch({
        type: ActionType.SET_AUTH_USER_SUCCESS,
        payload: authUser,
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_AUTH_USER_FAILURE,
        payload: error.message,
      });
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken("");
  };
}

export {
  ActionType,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
