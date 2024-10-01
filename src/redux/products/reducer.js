import { ActionType } from "./action";

const initialState = {
  products: null,
  loading: false,
  error: false,
  message: null,
  success: false,
};

function productsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.ADD_PRODUCT_REQUEST:
    case ActionType.SET_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.ADD_PRODUCT_FAILURE:
    case ActionType.SET_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case ActionType.RECEIVE_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        addSuccess: true,
        products: [...state.products, action.payload.product],
        error: false,
      };
    case ActionType.CLEAR_STATUS_ADD_PRODUCT:
      return {
        ...state,
        addSuccess: false,
      };
    case ActionType.CLEAR_PRODUCT_DATA:
      return state;
    default:
      return state;
  }
}

export default productsReducer;
