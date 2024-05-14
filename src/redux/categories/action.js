import api from "../../utils/api";

const ActionType = {
  SET_CATEGORIES_FAILURE: "SET_CATEGORIES_FAILURE",
  SET_CATEGORIES_REQUEST: "SET_CATEGORIES_REQUEST",
  SET_CATEGORIES_SUCCESS: "SET_CATEGORIES_SUCCESS",

  ADD_PRODUCTS: "ADD_THREAD",
  TOGGLE_WHISHLIST_PRODUCT: "TOGGLE_WHISHLIST_PRODUCT",
};

function toggleWhishlistActionCreator({ productId, userId }) {
  return {
    type: ActionType.TOGGLE_WHISHLIST_PRODUCT,
    payload: {
      productId,
      userId,
    },
  };
}

function asyncSetProducts() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CATEGORIES_REQUEST });
    try {
      const products = await api.getAllProducts();
      dispatch({
        type: ActionType.SET_CATEGORIES_SUCCESS,
        payload: { products },
      });
    } catch (error) {
      dispatch({ type: ActionType.SET_CATEGORIES_FAILURE, payload: { error } });
    }
  };
}

function asyncToogleWhishlistProduct({ productId, userId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleWhishlistActionCreator({ productId, userId: authUser.id }));
    try {
      await api.toggleLikeThread({ productId, userId });
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleWhishlistActionCreator({ productId, userId: authUser.id }),
      );
    }
  };
}

export {
  ActionType,
  asyncSetProducts,
  // AddProductActionCreator,
  // asyncAddProduct,
  toggleWhishlistActionCreator,
  asyncToogleWhishlistProduct,
};
