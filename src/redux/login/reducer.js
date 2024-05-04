import { ActionType } from "./action";

const initialState = {
  token: null,
  authUser: null,
  loading: false,
  error: false,
  message: null,
};

function authUserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.payload,
      };
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        token: action.payload,
        message: action.payload.message,
      };


    case ActionType.CLEAR_STATE:
      return initialState
    default:
      return state;
  }
}

export default authUserReducer;
