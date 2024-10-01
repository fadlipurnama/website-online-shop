import api from "../../utils/api";

const ActionType = {
  SET_CATEGORIES_FAILURE: "SET_CATEGORIES_FAILURE",
  SET_CATEGORIES_REQUEST: "SET_CATEGORIES_REQUEST",
  RECEIVE_CATEGORIES_SUCCESS: "SET_CATEGORIES_SUCCESS",
  RESET_CATEGORIES_DATA: "RESET_CATEGORIES_DATA",

  ADD_CATEGORIES: "ADD_CATEGORIES",
};

function receiveCategoriesActionCreator(categories) {
  return {
    type: ActionType.RECEIVE_CATEGORIES_SUCCESS,
    payload: {
      categories,
    },
  };
}


function asyncSetCategories() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CATEGORIES_REQUEST });
    try {
      const categories = await api.getAllCategories();
      dispatch(receiveCategoriesActionCreator(categories))
    } catch (error) {
      dispatch({ type: ActionType.SET_CATEGORIES_FAILURE, payload: { error } });
    }
  };
}
function resetCategoriesData() {
  return {
    type: ActionType.RESET_CATEGORIES_DATA,
   
  };
}


export {
  resetCategoriesData,
  ActionType,
  asyncSetCategories,
};
