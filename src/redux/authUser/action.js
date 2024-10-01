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
function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER_SUCCESS,
    payload: {
      authUser,
    },
  };
}

function asyncSetAuthUser() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_AUTH_USER_REQUEST });
    try {
      const  authUser = await api.getOwnProfile();
      dispatch(
        setAuthUserActionCreator(authUser),
      );
    } catch (error) {
      dispatch({
        type: ActionType.SET_AUTH_USER_FAILURE,
        payload: { error: error.message },
      });
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.removeAccessToken();
  };
}

export {
  ActionType,
  unsetAuthUserActionCreator,
  setAuthUserActionCreator,
  // asyncUpdateUser,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
