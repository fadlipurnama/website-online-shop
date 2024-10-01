import { ActionType } from "./action";

const initialState = {
  loading: false,
  error: null,
  transactionData: null,
};

function transactionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_TRANSACTION_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionType.SET_TRANSACTION_FAILURE:
      return { ...state, loading: false, error: action.payload?.error};
    case ActionType.SET_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        transactionData: action.payload,
        error: null,
      };
    case ActionType.RESET_ORDER_DATA:
      return {
        ...state,
        transactionData: null,
        error: null,
      };
    case ActionType.SET_TRANSACTION_BY_ID_SUCCESS: // Tambahkan case ini
      return {
        ...state,
        loading: false,
        transactionData: action.payload,
        error: null,
      };
    case ActionType.SET_TRANSACTION_BY_USER_ID_SUCCESS: // Tambahkan case ini
      return {
        ...state,
        loading: false,
        transactionData: action.payload,
        error: null,
      };
    case ActionType.DELETE_TRANSACTION:
      return {
        state,
      };
    case ActionType.RESET_TRANSACTION_DATA:
      return {
        ...state,
        transactionData: null,
        error: null,
      };

    default:
      return state;
  }
}

export default transactionReducer;
