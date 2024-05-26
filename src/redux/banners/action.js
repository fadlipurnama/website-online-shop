import api from "../../utils/api";

const ActionType = {
  SET_BANNER_FAILURE: "SET_BANNER_FAILURE",
  SET_BANNER_REQUEST: "SET_BANNER_REQUEST",
  RECEIVE_BANNER_SUCCESS: "RECEIVE_BANNER_SUCCESS",

  CLEAR_STATE: "CLEAR_STATE",

  ADD_BANNER: "ADD_BANNER",
};

function receiveBannerActionCreator(banners) {
  return {
    type: ActionType.RECEIVE_BANNER_SUCCESS,
    payload: {
      banners,
    },
  };
}
function clearStateBannerActionCreator() {
  return {
    type: ActionType.CLEAR_STATE,
  };
}

function asyncSetBanners() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_BANNER_REQUEST });
    try {
      const banners = await api.getAllBanners();
      dispatch(receiveBannerActionCreator(banners));
    } catch (error) {
      dispatch({ type: ActionType.SET_BANNER_FAILURE, payload: { error } });
    }
  };
}

export { ActionType, asyncSetBanners, clearStateBannerActionCreator };
