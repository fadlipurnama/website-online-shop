import api from "../../utils/api";

const ActionType = {
  SET_ORDER_REQUEST: "SET_ORDER_REQUEST",
  SET_ORDER_FAILURE: "SET_ORDER_FAILURE",
  SET_ORDER_SUCCESS: "SET_ORDER_SUCCESS",
  SET_ORDER_BY_USER_ID_SUCCESS: "SET_ORDER_BY_USER_ID_SUCCESS",
  RESET_ORDER_DATA:"RESET_ORDER_DATA"
};



function setOrderRequest() {
  return {
    type: ActionType.SET_ORDER_REQUEST,
  };
}

function setOrderFailure(error) {
  return {
    type: ActionType.SET_ORDER_FAILURE,
    payload: {
      error,
    },
  };
}

function resetOrderData() {
  return {
    type: ActionType.RESET_ORDER_DATA,
  };
}

function setOrderSuccess(response) {
  return {
    type: ActionType.SET_ORDER_SUCCESS,
    payload: response.data,
  };
}

// Fetch orders by userId
function asyncGetOrdersByUserId(userId) {
  return async (dispatch) => {
    dispatch(setOrderRequest());
    try {
      const response = await api.getOrdersByUserId(userId);
      dispatch({
        type: ActionType.SET_ORDER_BY_USER_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch(setOrderFailure(error));
    }
  };
}

export {
  ActionType,
  asyncGetOrdersByUserId,
  setOrderRequest,
  setOrderFailure,
  resetOrderData,
  setOrderSuccess,
};
