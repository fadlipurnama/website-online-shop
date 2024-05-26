import { ActionType } from "./action";

const initialState = {
  banners: null,
  loading: false,
  error: false,
  message: null,
};

function threadsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_BANNER_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.SET_BANNER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case ActionType.RECEIVE_BANNER_SUCCESS:
      return {
        ...state,
        banners: action.payload.banners,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.CLEAR_STATE:
      return initialState
    // case ActionType.ADD_THREAD:
    //   return [action.payload.categories, ...threads];
    default:
      return state;
  }
}

export default threadsReducer;
