import { ActionType } from "./action";

const initialState = {
  products: null,
  loading: false,
  error: false,
  message: null,
};

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.SET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case ActionType.SET_CATEGORIES_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        error: false,
        message: null,
      };
    // case ActionType.ADD_THREAD:
    //   return [action.payload.products, ...threads];
    default:
      return state;
  }
}

export default threadsReducer;
