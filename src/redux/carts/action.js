import api from "../../utils/api";

const ActionType = {
  SET_CART_FAILURE: "SET_CART_FAILURE",
  SET_CART_REQUEST: "SET_CART_REQUEST",
  CLEAR_CART_USER_FAILURE: "CLEAR_CART_USER_FAILURE",
  CLEAR_CART_USER_REQUEST: "CLEAR_CART_USER_REQUEST",

  CLEAR_CART_USER_SUCCESS: "CLEAR_CART_USER_SUCCESS",

  RECEIVE_CART_SUCCESS: "RECEIVE_CART_SUCCESS",

  ADD_ITEM_TO_CART_SUCCESS: "ADD_ITEM_TO_CART_SUCCESS",

  UPDATE_QUANTITY_SUCCESS: "UPDATE_QUANTITY_CART_ITEM_SUCCESS",

  DELETE_CART_ITEM_SUCCESS: "DELETE_CART_ITEM_SUCCESS",

  CLEAR_DATA_CARTS: "CLEAR_DATA_CARTS",
};

function receiveCartActionCreator({ carts, message, totalQuantity }) {
  return {
    type: ActionType.RECEIVE_CART_SUCCESS,
    payload: {
      carts,
      message,
      totalQuantity,
    },
  };
}
function clearDataCartsActionCreator() {
  return {
    type: ActionType.RECEIVE_CART_SUCCESS,
  };
}

function asyncSetCarts() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CART_REQUEST });
    try {
      const response = await api.getDataCart();
      dispatch(
        receiveCartActionCreator({
          carts: response.data,
          message: response.message,
          totalQuantity: response.totalQuantity,
        }),
      );
    } catch (error) {
      dispatch({ type: ActionType.SET_CART_FAILURE, payload: { error } });
    }
  };
}

function asyncAddItemToCart({ productId, quantity }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CART_REQUEST });
    try {
      const response = await api.addItemToCart({ productId, quantity });
      dispatch({
        type: ActionType.ADD_ITEM_TO_CART_SUCCESS,
        payload: {
          newCart: response.data,
          message: response.message,
          totalQuantity: response.totalQuantity,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_CART_FAILURE,
        payload: { error },
      });
    }
  };
}
function asyncUpdateQuantityCartItem({ cartItemId, quantity }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CART_REQUEST });
    try {
      const response = await api.updateQuantity({ cartItemId, quantity });
      console.log(response);
      dispatch({
        type: ActionType.UPDATE_QUANTITY_SUCCESS,
        payload: {
          updatedCart: response.data,
          message: response.message,
          totalQuantity: response.totalQuantity,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_CART_FAILURE,
        payload: { error },
      });
    }
  };
}
function asyncDeleteCartItem(cartItemId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CART_REQUEST });
    try {
      const response = await api.deleteCartItem(cartItemId);
      dispatch({
        type: ActionType.DELETE_CART_ITEM_SUCCESS,
        payload: {
          cartItemId,
          message: response.message,
          totalQuantity: response.totalQuantity,
        },
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_CART_FAILURE,
        payload: { error },
      });
    }
  };
}

function asyncClearCartUser() {
  return async (dispatch) => {
    dispatch({ type: ActionType.CLEAR_CART_USER_REQUEST });
    try {
      const response = await api.clearCartUser();
      dispatch({ type: ActionType.CLEAR_CART_USER_SUCCESS, payload: response });
    } catch (error) {
      dispatch({
        type: ActionType.CLEAR_CART_USER_FAILURE,
        payload: { error },
      });
    }
  };
}

export {
  ActionType,
  asyncSetCarts,
  asyncClearCartUser,
  asyncDeleteCartItem,
  clearDataCartsActionCreator,
  asyncUpdateQuantityCartItem,
  asyncAddItemToCart,
};
