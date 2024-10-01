import { ActionType } from "./action";

const initialState = {
  loading: false,
  error: null,
  orderData: null,
};

function orderReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.SET_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case ActionType.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case ActionType.SET_ORDER_BY_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderData: action.payload,
        error: null,
      };
    case ActionType.SET_ORDER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        orderData: action.payload,
        error: null,
      };
    case ActionType.RESET_ORDER_DATA:
      return state;
    default:
      return state;
  }
}

export default orderReducer;
