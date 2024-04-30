import { ActionType } from "./action";

const initialState = {
  loading: false,
  token: null,
  authUser: null,
  error: null,
};

function authUserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_AUTH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.SET_AUTH_USER_SUCCESS:
      return {
        ...state,
        authUser: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.SET_AUTH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ActionType.UNSET_AUTH_USER:
      return initialState;
    default:
      return state;
  }
}

export default authUserReducer;
