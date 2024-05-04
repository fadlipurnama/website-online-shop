import { ActionType } from "./action";

const initialState = {
  token: null,
  loading: false,
  error: false,
  message: null,
};

const authReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    // case ActionType.LOGIN_REQUEST:
    case ActionType.REGISTER_REQUEST:
      return { ...state, loading: true, error: false };
    // case ActionType.LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     error: false,
    //     loading: false,
    //     token: action.payload,
    //     message: action.payload.message,
    //   };
    case ActionType.REGISTER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        message: action.payload.message,
      };
    // case ActionType.LOGIN_FAILURE:
    //   return {
    //     ...state,
    //     error: true,
    //     loading: false,
    //     message: action.payload,
    //   };
    case ActionType.REGISTER_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.payload,
      };
    case ActionType.CLEAR_STATE:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
