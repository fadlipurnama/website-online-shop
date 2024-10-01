import { ActionType } from "./action";

const initialState = {
  categories: null,
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
    case ActionType.RECEIVE_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload.categories,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.RESET_CATEGORIES_DATA:
      return {
        state,
      };
    default:
      return state;
  }
}

export default threadsReducer;
