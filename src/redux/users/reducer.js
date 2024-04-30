import { ActionType } from "./action";

const initialState = {
  loading: false,
  token: null,
  user: null,
  error: null,
  message: null,
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
    case ActionType.REGISTER_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.authToken,
        error: null,
      };
    case ActionType.REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.authToken,
        loading: false,
        error: null,
      };
    case ActionType.LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: JSON.parse(action.payload),
        message: JSON.parse(action.payload),
      };
    case ActionType.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: JSON.parse(action.payload),
        message: JSON.parse(action.payload),
      };
    case ActionType.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
