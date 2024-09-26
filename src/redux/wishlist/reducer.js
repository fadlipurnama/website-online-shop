import { ActionType } from "./action";

const initialState = {
  wishlist: [],
  loading: false,
  error: false,
  message: null,
  success: false,
};

function wishlistReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_WISHLIST_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.SET_WISHLIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload?.error,
      };
    case ActionType.RECEIVE_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: action.payload?.wishlist,
        loading: false,
        error: false,
        message: action.payload?.message,
      };
    case ActionType.ADD_ITEM_TO_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload?.newWishlist],
        loading: false,
        error: false,
        message: action.payload?.message,
      };
    case ActionType.DELETE_WISHLIST_ITEM_SUCCESS:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (item) => item.product._id !== action.payload.productId,
        ),
        loading: false,
        error: false,
        message: action.payload?.message,
      };
    case ActionType.CLEAR_DATA_WISHLIST:
      return initialState;
    default:
      return state;
  }
}

export default wishlistReducer;
