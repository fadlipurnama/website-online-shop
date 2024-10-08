import api from "../../utils/api";
import { asyncAddItemToWishlist, asyncDeleteWishlistItem } from "../wishlist/action";

const ActionType = {
  SET_DETAIL_PRODUCT_FAILURE: "SET_DETAIL_PRODUCT_FAILURE",
  SET_DETAIL_PRODUCT_REQUEST: "SET_DETAIL_PRODUCT_REQUEST",
  
  RECEIVE_DETAIL_PRODUCT_SUCCESS: "RECEIVE_DETAIL_PRODUCT_SUCCESS",

  DELETE_PRODUCT_SUCCESS: "DELETE_PRODUCT_SUCCESS",

  UPDATE_PRODUCT_SUCCESS: "UPDATE_PRODUCT_SUCCESS",

  CLEAR_STATUS_UPDATE_PRODUCT: "CLEAR_STATUS_UPDATE_PRODUCT",

  CLEAR_DETAIL_PRODUCT: "CLEAR_DETAIL_PRODUCT",

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

function asyncSetDetailProduct(productId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_DETAIL_PRODUCT_REQUEST });
    try {
      const detailProduct = await api.getProductById(productId);
      dispatch(receiveDetailProductActionCreator(detailProduct));
    } catch (error) {
      dispatch({
        type: ActionType.SET_DETAIL_PRODUCT_FAILURE,
        payload: { error },
      });
      console.error(error.message);
    }
  };
}

function asyncDeleteProductById(productId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_DETAIL_PRODUCT_REQUEST });

    try {
      await api.deleteProductById(productId);
      dispatch({
        type: ActionType.DELETE_PRODUCT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: ActionType.SET_DETAIL_PRODUCT_FAILURE,
        payload: { error },
      });
      console.error(error.message);
    }
  };
}

function asyncUpdateProductById({ productId, ...productData }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_DETAIL_PRODUCT_REQUEST });
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
        type: ActionType.SET_DETAIL_PRODUCT_FAILURE,
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

function toggleWishlistActionCreator({productId, isInWishlist}) {
  return (dispatch) =>  {
    if (isInWishlist) {
      dispatch(asyncDeleteWishlistItem(productId));
    } else {
      dispatch(asyncAddItemToWishlist(productId));
    }
  };
}

export {
  ActionType,
  receiveDetailProductActionCreator,
  asyncDeleteProductById,
  clearStatusUpdateProductActionCreator,
  asyncUpdateProductById,
  clearDetailProductActionCreator,
  toggleWishlistActionCreator,
  asyncSetDetailProduct,
  // asyncAddThreadComment,
  // addThreadCommentActionCreator,
};
