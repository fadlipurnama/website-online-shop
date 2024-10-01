import api from "../../utils/api";

const ActionType = {
  SET_ORDER_REQUEST: "SET_ORDER_REQUEST",
  SET_ORDER_FAILURE: "SET_ORDER_FAILURE",
  SET_ORDER_BY_USER_ID_SUCCESS: "SET_ORDER_BY_USER_ID_SUCCESS",
  SET_ORDER_BY_ID_SUCCESS: "SET_ORDER_BY_USER_ID_SUCCESS",
  RESET_ORDER_DATA:"RESET_ORDER_DATA",

   CREATE_ORDER_SUCCESS: "CREATE_ORDER_SUCCESS"
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


// Fungsi asinkron untuk membuat order
function asyncCreateOrder(orderData) {
  return async (dispatch) => {
    dispatch(setOrderRequest());
    try {
      const response = await api.createOrder(orderData); 
      dispatch({
        type: ActionType.CREATE_ORDER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
    console.log(orderData)
      dispatch(setOrderFailure(error));
    }
  };
}

// Fetch orders by userId
function asyncGetOrderByUserId(userId) {
  return async (dispatch) => {
    dispatch(setOrderRequest());
    try {
      const response = await api.getOrderByUserId(userId);
      dispatch({
        type: ActionType.SET_ORDER_BY_USER_ID_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch(setOrderFailure(error.error));
      console.log(error.error)
    }
  };
}
// Fetch orders by Id
function asyncGetOrderById(orderId) {
  return async (dispatch) => {
    dispatch(setOrderRequest());
    try {
      const response = await api.getOrderById(orderId);
      dispatch({
        type: ActionType.SET_ORDER_BY_USER_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch(setOrderFailure(error.error));
      console.log(error.error)
    }
  };
}

export {
  ActionType,
  asyncGetOrderByUserId,
  asyncGetOrderById,
  asyncCreateOrder,
  setOrderRequest,
  setOrderFailure,
  resetOrderData,
  // setOrderSuccess,
};
