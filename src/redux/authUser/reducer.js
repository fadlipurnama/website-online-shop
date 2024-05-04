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
    case ActionType.SET_AUTH_USER_REQUEST:
      return { ...state, loading: true, error: false };

    case ActionType.SET_AUTH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case ActionType.SET_AUTH_USER_SUCCESS:
      return {
        ...state,
        authUser: action.payload,
        token: null,
        loading: false,
        error: false,
        message: action.payload,
      };
    case ActionType.UNSET_AUTH_USER:
      return initialState;
    default:
      return state;
  }
}

export default authUserReducer;
