import api from "../../utils/api";

const ActionType = {
  RECEIVE_DETAIL_PRODUCT_FAILURE: "RECEIVE_DETAIL_PRODUCT_FAILURE",
  RECEIVE_DETAIL_PRODUCT_REQUEST: "RECEIVE_DETAIL_PRODUCT_REQUEST",
  RECEIVE_DETAIL_PRODUCT_SUCCESS: "RECEIVE_DETAIL_PRODUCT_SUCCESS",

  DELETE_PRODUCT_FAILURE: "DELETE_PRODUCT_FAILURE",
  DELETE_PRODUCT_REQUEST: "DELETE_PRODUCT_REQUEST",
  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",

  UPDATE_PRODUCT_FAILURE: "UPDATE_PRODUCT_FAILURE",
  UPDATE_PRODUCT_REQUEST: "UPDATE_PRODUCT_REQUEST",
  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",

  CLEAR_STATUS_UPDATE_PRODUCT: "CLEAR_STATUS_UPDATE_PRODUCT",
  CLEAR_DETAIL_PRODUCT: "CLEAR_DETAIL_PRODUCT",

  ADD_COMMENT: "ADD_COMMENT",
};

function receiveDetailProductActionCreator(detailProduct) {
  return {
    type: ActionType.RECEIVE_DETAIL_PRODUCT_SUCCESS,
    payload: {
      detailProduct,
    },
  };
}

function clearStatusUpdateProductActionCreator() {
  return {
    type: ActionType.CLEAR_STATUS_UPDATE_PRODUCT,
  };
}
function clearDetailProductActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_PRODUCT,
  };
}

function asyncReceiveDetailProduct(productId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.RECEIVE_DETAIL_PRODUCT_REQUEST });
    try {
      const detailProduct = await api.getProductById(productId);
      dispatch(receiveDetailProductActionCreator(detailProduct));
    } catch (error) {
      dispatch({
        type: ActionType.RECEIVE_DETAIL_PRODUCT_FAILURE,
        payload: { error },
      });
      console.error(error.message);
    }
  };
}

function asyncDeleteProductById(productId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.DELETE_PRODUCT_REQUEST });

    try {
      await api.deleteProductById(productId);
      dispatch({
        type: ActionType.DELETE_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ActionType.DELETE_PRODUCT_FAILURE,
        payload: { error },
      });
      console.error(error.message);
    }
  };
}

function asyncUpdateProductById({ productId, ...productData }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.UPDATE_PRODUCT_REQUEST });
    try {
      const detailProduct = await api.updateProductById({
        productId,
        productData,
      });
      dispatch({
        type: ActionType.UPDATE_PRODUCT_SUCCESS,
        payload: { detailProduct },
      });
    } catch (error) {
      dispatch({
        type: ActionType.UPDATE_PRODUCT_FAILURE,
        payload: { error },
      });
    }
  };
}

// function addThreadCommentActionCreator(comment) {
//   return {
//     type: ActionType.ADD_COMMENT,
//     payload: {
//       comment,
//     },
//   };
// }

// function asyncAddThreadComment({ productId, content }) {
//   return async (dispatch) => {
//     try {
//       const comment = await api.createComment({ productId, content });
//       dispatch(addThreadCommentActionCreator(comment));
//       const DetailProduct = await api.getDetailProduct(productId);
//       dispatch(receiveDetailProductActionCreator(DetailProduct));
//     } catch (error) {
//       alert(error.message);
//     }
//   };
// }

export {
  ActionType,
  receiveDetailProductActionCreator,
  asyncDeleteProductById,
  clearStatusUpdateProductActionCreator,
  asyncUpdateProductById,
  clearDetailProductActionCreator,
  asyncReceiveDetailProduct,
  // asyncAddThreadComment,
  // addThreadCommentActionCreator,
};
