import api from "../../utils/api";
import { nanoid } from "nanoid";

const ActionType = {
  SET_TRANSACTION_REQUEST: "SET_TRANSACTION_REQUEST",
  SET_TRANSACTION_FAILURE: "SET_TRANSACTION_FAILURE",
  SET_TRANSACTION_SUCCESS: "SET_TRANSACTION_SUCCESS",

  RESET_TRANSACTION_DATA: "RESET_TRANSACTION_DATA",
  SET_TRANSACTION_BY_ID_SUCCESS: "SET_TRANSACTION_BY_ID_SUCCESS", // Tambahkan ini
  SET_TRANSACTION_BY_USER_ID_SUCCESS: "SET_TRANSACTION_BY_USER_ID_SUCCESS", // Tambahkan ini
  DELETE_TRANSACTION: "DELETE_TRANSACTION", // Tambahkan ini
};

function resetTransactionData() {
  return {
    type: ActionType.RESET_TRANSACTION_DATA,
  };
}

function setTransactionRequest() {
  return {
    type: ActionType.SET_TRANSACTION_REQUEST,
  };
}

function setTransactionFailure(error) {
  return {
    type: ActionType.SET_TRANSACTION_FAILURE,
    payload: {
      error,
    },
  };
}

function setTransactionSuccess(response) {
  return {
    type: ActionType.SET_TRANSACTION_SUCCESS,
    payload: response.data,
  };
}

function asyncCreateTransaction({
  carts,
  // totalShopping,
  grossAmount,
  tax,
  shippingCost,
  authUser,
  shippingCourier,
  shippingService,
  shippingAddress,
  paymentMethod, // Atau metode pembayaran yang dipilih
  customRound,
}) {
  return async (dispatch) => {
    dispatch(setTransactionRequest());
    try {
      const response = await api.createTransaction({
        grossAmount,
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        shippingCourier,
        userId: authUser._id,
        shippingService,
        shippingAddress,
        paymentMethod,
        customerEmail: authUser.email,
        phoneNumber: authUser.phoneNumber,
        products: [
          ...carts.map((item) => ({
            id: item.product._id,
            name: `${item.product.name.substring(0, 40)}...`,
            price: customRound(
              item.product.price -
                (item.product.price * item.product.discount) / 100,
            ),
            quantity: item.quantity,
          })),
          {
            id: `shipping-cost-${nanoid(4)}-${nanoid(8)}`,
            name: "Biaya Pengiriman",
            price: customRound(shippingCost),
            quantity: 1,
          },
          {
            id: `tax-id-${nanoid(4)}-${nanoid(8)}`,
            name: "PPN",
            price: customRound(tax),
            quantity: 1,
          },
        ],
      });
      dispatch(setTransactionSuccess(response));
    } catch (error) {
      dispatch(setTransactionFailure(error.message));
    }
  };
}

// Fetch transaction by transactionId
function asyncGetTransactionById(transactionId) {
  return async (dispatch) => {
    dispatch(setTransactionRequest());
    try {
      const response = await api.getTransactionById(transactionId);
      dispatch({
        type: ActionType.SET_TRANSACTION_BY_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch(setTransactionFailure(error));
    }
  };
}
function asyncDeleteTransaction(transactionId) {
  return async (dispatch) => {
    dispatch(setTransactionRequest());
    try {
      const response = await api.deleteTransaction(transactionId);
      dispatch({
        type: ActionType.DELETE_TRANSACTION,
        payload: response.data,
      });
    } catch (error) {
      dispatch(setTransactionFailure(error.message));
    }
  };
}



// Fetch transactions by userId
function asyncGetTransactionsByUserId(userId) {
  return async (dispatch) => {
    dispatch(setTransactionRequest());
    try {
      const response = await api.getTransactionByUserId(userId);
      dispatch({
        type: ActionType.SET_TRANSACTION_BY_USER_ID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch(setTransactionFailure(error));
    }
  };
}

export {
  ActionType,
  asyncDeleteTransaction,
  asyncGetTransactionsByUserId,
  asyncGetTransactionById,
  asyncCreateTransaction,
  setTransactionRequest,
  setTransactionFailure,
  setTransactionSuccess,
  resetTransactionData,
};
