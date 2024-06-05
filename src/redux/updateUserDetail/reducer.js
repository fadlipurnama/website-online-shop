import { ActionType } from "./action";

const initialState = {
  loading: false,
  error: false,
  message: null,
  updateSuccess: false,
};

function authUserReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: false };

    case ActionType.UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    case ActionType.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        updateSuccess: true,
      };
    case ActionType.CLEARE_STATUS_UPDATED:
      return initialState;
    default:
      return state;
  }
}

export default authUserReducer;
