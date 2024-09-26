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
      case ActionType.SET_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          orderData: action.payload,
          error: null,
        };
      case ActionType.SET_ORDER_BY_USER_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          orderData: action.payload,
          error: null,
        };
      default:
        return state;
    }
  }
  
  export default orderReducer;
  