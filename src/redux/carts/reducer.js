import { ActionType } from "./action";

const initialState = {
  carts: null,
  loading: false,
  error: false,
  message: null,
  totalQuantity: 0,
  success: false,
};

function cartsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_CART_REQUEST:
    case ActionType.CLEAR_CART_USER_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.SET_CART_FAILURE:
    case ActionType.CLEAR_CART_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    case ActionType.ADD_ITEM_TO_CART_SUCCESS:
      return {
        ...state,
        carts: state?.carts.some(
          (cart) => cart._id === action.payload.newCart._id,
        )
          ? state?.carts.map((cart) =>
              cart._id === action.payload.newCart._id
                ? action.payload.newCart
                : cart,
            )
          : [...state.carts, action.payload.newCart],
        loading: false,
        error: false,
        message: action.payload.message, // Store success message as string
        totalQuantity: action.payload?.totalQuantity,
      };
    case ActionType.RECEIVE_CART_SUCCESS:
      return {
        ...state,
        carts: action.payload?.carts,
        loading: false,
        error: false,
        message: action.payload?.message,
        totalQuantity: action.payload?.totalQuantity,
      };
    case ActionType.UPDATE_QUANTITY_SUCCESS:
      return {
        ...state,
        carts: state?.carts.map((cart) =>
          cart._id === action.payload.updatedCart._id
            ? action.payload.updatedCart
            : cart,
        ),
        loading: false,
        error: false,
        message: action.payload?.message,
        totalQuantity: action.payload.totalQuantity,
      };
    case ActionType.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        carts: state.carts.filter(
          (item) => item._id !== action.payload.cartItemId,
        ),
        message: action.payload?.message,
        totalQuantity: action.payload.totalQuantity,
      };
    case ActionType.CLEAR_CART_USER_SUCCESS:
      return state;
    case ActionType.CLEAR_DATA_CARTS:
      return state;
    default:
      return state;
  }
}

export default cartsReducer;
