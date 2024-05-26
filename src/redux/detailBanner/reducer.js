import { ActionType } from "./action";

const initialState = {
  detailBanner: null,
  loading: false,
  error: false,
  message: null,
  updateSuccess: false,
  deleteSuccess: false,
};

function detailBannerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_BANNER_REQUEST:
    case ActionType.UPDATE_BANNER_REQUEST:
    case ActionType.SET_DETAIL_BANNER_REQUEST:
      return { ...state, loading: true, error: false };

    case ActionType.DELETE_BANNER_FAILURE:
    case ActionType.UPDATE_BANNER_FAILURE:
    case ActionType.SET_DETAIL_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    case ActionType.RECEIVE_DETAIL_BANNER_SUCCESS:
      return {
        ...state,
        detailBanner: action.payload.detailBanner,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.UPDATE_BANNER_SUCCESS:
      return {
        ...state,
        detailBanner: action.payload.detailBanner,
        loading: false,
        error: false,
        message: null,
        updateSuccess: true,
      };

    case ActionType.DELETE_BANNER_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
      };
    case ActionType.CLEAR_DETAIL_BANNER:
      return initialState;
    case ActionType.CLEAR_STATUS_UPDATE_BANNER:
      return { ...state, updateSuccess: false };
    default:
      return state;
  }
}

export default detailBannerReducer;
