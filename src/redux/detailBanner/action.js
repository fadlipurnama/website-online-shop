import api from "../../utils/api";

const ActionType = {
  SET_DETAIL_BANNER_FAILURE: "SET_DETAIL_BANNER_FAILURE",
  SET_DETAIL_BANNER_REQUEST: "SET_DETAIL_BANNER_REQUEST",
  RECEIVE_DETAIL_BANNER_SUCCESS: "RECEIVE_DETAIL_BANNER_SUCCESS",

  DELETE_BANNER_FAILURE: "DELETE_BANNER_FAILURE",
  DELETE_BANNER_REQUEST: "DELETE_BANNER_REQUEST",
  DELETE_BANNER_SUCCESS: "DELETE_BANNER_SUCCESS",

  UPDATE_BANNER_FAILURE: "UPDATE_BANNER_FAILURE",
  UPDATE_BANNER_REQUEST: "UPDATE_BANNER_REQUEST",
  UPDATE_BANNER_SUCCESS: "UPDATE_BANNER_SUCCESS",

  CLEAR_STATUS_UPDATE_BANNER: "CLEAR_STATUS_UPDATE_BANNER",
  CLEAR_DETAIL_BANNER: "CLEAR_DETAIL_BANNER",
};

function receiveDetailBannerActionCreator(detailBanner) {
  return {
    type: ActionType.RECEIVE_DETAIL_BANNER_SUCCESS,
    payload: {
      detailBanner,
    },
  };
}

function clearStatusUpdateBannerActionCreator() {
  return {
    type: ActionType.CLEAR_STATUS_UPDATE_BANNER,
  };
}
function clearDetailBannerActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_BANNER,
  };
}

function asyncSetDetailBanner(bannerId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_DETAIL_BANNER_REQUEST });
    try {
      const detailBanner = await api.getBannerById(bannerId);
      dispatch(receiveDetailBannerActionCreator(detailBanner));
    } catch (error) {
      dispatch({
        type: ActionType.SET_DETAIL_BANNER_FAILURE,
        payload: { error },
      });
      console.error(error.message);
    }
  };
}

function asyncDeleteBannerById(bannerId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.DELETE_BANNER_REQUEST });

    try {
      await api.deleteBannerById(bannerId);
      dispatch({
        type: ActionType.DELETE_BANNER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ActionType.DELETE_BANNER_FAILURE,
        payload: { error },
      });
      console.error(error.message);
    }
  };
}

function asyncUpdateBannerById({ bannerId, ...bannerData }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.UPDATE_BANNER_REQUEST });
    try {
      const detailBanner = await api.updateBannerById({
        bannerId,
        bannerData,
      });
      dispatch({
        type: ActionType.UPDATE_BANNER_SUCCESS,
        payload: { detailBanner },
      });
    } catch (error) {
      dispatch({
        type: ActionType.UPDATE_BANNER_FAILURE,
        payload: { error },
      });
    }
  };
}

export {
  ActionType,
  receiveDetailBannerActionCreator,
  asyncDeleteBannerById,
  clearStatusUpdateBannerActionCreator,
  asyncUpdateBannerById,
  clearDetailBannerActionCreator,
  asyncSetDetailBanner,

};
