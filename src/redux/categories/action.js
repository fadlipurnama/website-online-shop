import api from "../../utils/api";

const ActionType = {
  SET_CATEGORIES_FAILURE: "SET_CATEGORIES_FAILURE",
  SET_CATEGORIES_REQUEST: "SET_CATEGORIES_REQUEST",
  SET_CATEGORIES_SUCCESS: "SET_CATEGORIES_SUCCESS",

  ADD_Categories: "ADD_THREAD",
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

function asyncSetCategories() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CATEGORIES_REQUEST });
    try {
      const categories = await api.getAllCategories();
      dispatch({
        type: ActionType.SET_CATEGORIES_SUCCESS,
        payload: { categories },
      });
    } catch (error) {
      dispatch({ type: ActionType.SET_CATEGORIES_FAILURE, payload: { error } });
    }
  };
}


export {
  ActionType,
  asyncSetCategories,
  toggleWhishlistActionCreator,
};
