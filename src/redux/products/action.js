import api from "../../utils/api";

const ActionType = {
  SET_PRODUCTS_FAILURE: "SET_PRODUCTS_FAILURE",
  SET_PRODUCTS_REQUEST: "SET_PRODUCTS_REQUEST",
  RECEIVE_PRODUCTS_SUCCESS: "RECEIVE_PRODUCTS_SUCCESS",

  ADD_PRODUCT_FAILURE: "ADD_PRODUCT_FAILURE",
  ADD_PRODUCT_REQUEST: "ADD_PRODUCT_REQUEST",
  ADD_PRODUCT_SUCCESS: "ADD_PRODUCT_SUCCESS",

  CLEAR_STATUS_ADD_PRODUCT: "CLEAR_STATUS_ADD_PRODUCT",

  DELETE_PRODUCT: "DELETE_PRODUCT",

  TOGGLE_WHISHLIST_PRODUCT: "TOGGLE_WHISHLIST_PRODUCT",
};



function receiveProductActionCreator(products) {
  return {
    type: ActionType.RECEIVE_PRODUCTS_SUCCESS,
    payload: {
      products,
    },
  };
}

function addProductActionCreator(product) {
  return {
    type: ActionType.ADD_PRODUCT_SUCCESS,
    payload: {
      product,
    },
  };
}

function clearStatusAddProductActionCreator() {
  return {
    type: ActionType.CLEAR_STATUS_ADD_PRODUCT,
  };
}

function asyncSetProducts() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_PRODUCTS_REQUEST });
    try {
      const products = await api.getAllProducts();
      dispatch(receiveProductActionCreator(products));
    } catch (error) {
      dispatch({ type: ActionType.SET_PRODUCTS_FAILURE, payload: { error } });
    }
  };
}

// function asyncToogleWhishlistProduct({ productId, userId }) {
//   return async (dispatch, getState) => {
//     const { authUser } = getState();
//     dispatch(toggleWhishlistActionCreator({ productId, userId: authUser.id }));
//     try {
//       await api.toggleLikeThread({ productId, userId });
//     } catch (error) {
//       alert(error.message);
//       dispatch(
//         toggleWhishlistActionCreator({ productId, userId: authUser.id }),
//       );
//     }
//   };
// }

function asyncAddProduct({ imageUrl, ...productData }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.ADD_PRODUCT_REQUEST });
    try {
      const formDataProduct = new FormData();
      for (const key in productData) {
        if (Object.hasOwnProperty.call(productData, key)) {
          const value = String(productData[key]);
          formDataProduct.append(key, value);
        }
      }
      formDataProduct.append("imageUrl", imageUrl);
      const newProduct = await api.createProduct(formDataProduct);
      dispatch(addProductActionCreator(newProduct));
    } catch (error) {
      dispatch({
        type: ActionType.ADD_PRODUCT_FAILURE,
        payload: error.message,
      });
    }
  };
}

export {
  ActionType,
  asyncSetProducts,
  clearStatusAddProductActionCreator,
  addProductActionCreator,
  asyncAddProduct,
  // asyncToogleWhishlistProduct,
};
