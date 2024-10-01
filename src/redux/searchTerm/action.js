import api from "../../utils/api";
import { receiveProductActionCreator } from "../products/action";

const ActionType = {
  SET_SEARCH_TERM_REQUEST: "SET_SEARCH_TERM_REQUEST",
  SET_SEARCH_TERM_SUCCESS: "SET_SEARCH_TERM_SUCCESS",
  SET_SEARCH_TERM_FAILURE: "SET_SEARCH_TERM_FAILURE",
  CLEAR_SEARCH_TERM: "CLEAR_SEARCH_TERM",
  SET_DATA_SEARCH_PRODUCT_SUCCESS: "SET_DATA_SEARCH_PRODUCT_SUCCESS",
};

function asyncSearchProducts(searchTerm) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_SEARCH_TERM_REQUEST });
    try {
      const response = await api.searchProducts(searchTerm); // Assuming API is ready
      dispatch({
        type: ActionType.SET_SEARCH_TERM_SUCCESS,
        payload: response,
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_SEARCH_TERM_FAILURE,
        payload: { error },
      });
    }
  };
}
function asyncSetSearchProducts(searchTerm) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_SEARCH_TERM_REQUEST });
    try {
      const response = await api.searchProducts(searchTerm); // Assuming API is ready
      dispatch(receiveProductActionCreator(response));
      dispatch({
        type: ActionType.SET_DATA_SEARCH_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_SEARCH_TERM_FAILURE,
        payload: { error },
      });
    }
  };
}

function clearSearchTerm() {
  return {
    type: ActionType.CLEAR_SEARCH_TERM,
  };
}

export { ActionType,clearSearchTerm,asyncSetSearchProducts, asyncSearchProducts };
