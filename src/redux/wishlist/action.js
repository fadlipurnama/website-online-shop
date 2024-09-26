import api from "../../utils/api";

const ActionType = {
  SET_WISHLIST_FAILURE: "SET_WISHLIST_FAILURE",
  SET_WISHLIST_REQUEST: "SET_WISHLIST_REQUEST",
  RECEIVE_WISHLIST_SUCCESS: "RECEIVE_WISHLIST_SUCCESS",
  ADD_ITEM_TO_WISHLIST_SUCCESS: "ADD_ITEM_TO_WISHLIST_SUCCESS",
  DELETE_WISHLIST_ITEM_SUCCESS: "DELETE_WISHLIST_ITEM_SUCCESS",
  CLEAR_DATA_WISHLIST: "CLEAR_DATA_WISHLIST",
};

function receiveWishListActionCreator({ wishlist, message }) {
  return {
    type: ActionType.RECEIVE_WISHLIST_SUCCESS,
    payload: {
      wishlist,
      message,
    },
  };
}

function asyncSetWishlist() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_WISHLIST_REQUEST });
    try {
      const response = await api.getDataWishlist();
      dispatch(
        receiveWishListActionCreator({
          wishlist: response.data,
          message: response.message,
        }),
      );
    } catch (error) {
      dispatch({ type: ActionType.SET_WISHLIST_FAILURE, payload: { error } });
    }
  };
}

function asyncAddItemToWishlist(productId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_WISHLIST_REQUEST });
    try {
      const response = await api.addItemToWishlist(productId);
      dispatch({
        type: ActionType.ADD_ITEM_TO_WISHLIST_SUCCESS,
        payload: {
          newWishlist: response.data,
          message: response.message,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_WISHLIST_FAILURE,
        payload: { error },
      });
    }
  };
}

function asyncDeleteWishlistItem(productId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_WISHLIST_REQUEST });
    try {
      const response = await api.deleteItemFromWishlist(productId);
      dispatch({
        type: ActionType.DELETE_WISHLIST_ITEM_SUCCESS,
        payload: {
          productId,
          message: response.message,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_WISHLIST_FAILURE,
        payload: { error },
      });
    }
  };
}

function clearWishlistActionCreator() {
  return {
    type: ActionType.CLEAR_DATA_WISHLIST,
  };
}

export {
  ActionType,
  asyncSetWishlist,
  asyncDeleteWishlistItem,
  asyncAddItemToWishlist,
  clearWishlistActionCreator
};
