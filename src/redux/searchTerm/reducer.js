import { ActionType } from "./action";

const initialState = {
  suggestions: null,
  loading: false,
  error: false,
  message: null,
  success: false,
};

function searchTermReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_SEARCH_TERM_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.SET_SEARCH_TERM_SUCCESS:
      return {
        ...state,
        suggestions: action.payload, // Atau suggestion sesuai kebutuhan
        loading: false,
        error: false,
      };
    case ActionType.SET_DATA_SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
      };
    case ActionType.SET_SEARCH_TERM_FAILURE:
      return { ...state, loading: false, error: true, message: action.payload };
    case ActionType.CLEAR_SEARCH_TERM:
      return initialState;
    default:
      return state;
  }
}

export default searchTermReducer;
