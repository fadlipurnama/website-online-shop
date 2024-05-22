import { ActionType } from "./action";

const initialState = {
  detailProduct: null,
  loading: false,
  error: false,
  message: null,
  updateSuccess: false,
  deleteSuccess: false,
};

function detailProductReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_PRODUCT_REQUEST:
    case ActionType.UPDATE_PRODUCT_REQUEST:
    case ActionType.SET_DETAIL_PRODUCT_REQUEST:
      return { ...state, loading: true, error: false };

    case ActionType.DELETE_PRODUCT_FAILURE:
    case ActionType.UPDATE_PRODUCT_FAILURE:
    case ActionType.SET_DETAIL_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    case ActionType.RECEIVE_DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        detailProduct: action.payload.detailProduct,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        detailProduct: action.payload.detailProduct,
        loading: false,
        error: false,
        message: null,
        updateSuccess: true,
      };

    case ActionType.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteSuccess: true,
      };
    case ActionType.CLEAR_DETAIL_PRODUCT:
      return initialState;
    case ActionType.CLEAR_STATUS_UPDATE_PRODUCT:
      return { ...state, updateSuccess: false };
    default:
      return state;
  }
}

export default detailProductReducer;
