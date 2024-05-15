import api from "../../utils/api";

const ActionType = {
  SET_PRODUCTS_FAILURE: "SET_PRODUCTS_FAILURE",
  SET_PRODUCTS_REQUEST: "SET_PRODUCTS_REQUEST",
  SET_PRODUCTS_SUCCESS: "SET_PRODUCTS_SUCCESS",

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
    dispatch({ type: ActionType.SET_PRODUCTS_REQUEST });
    try {
      const products = await api.getAllProducts();
      dispatch({
        type: ActionType.SET_PRODUCTS_SUCCESS,
        payload: { products },
      });
    } catch (error) {
      dispatch({ type: ActionType.SET_PRODUCTS_FAILURE, payload: { error } });
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

function AddProductActionCreator(product) {
  return {
    type: ActionType.ADD_PRODUCTS,
    payload: {
      product,
    },
  };
}

function asyncAddProduct({
  name,
  brand,
  price,
  category,
  imageUrl,
  rating,
  promo,
  isActive,
  stock,
  description,
}) {
  return async (dispatch) => {
    try {
      const newProduct = await api.createProduct({
        name,
        brand,
        price,
        category,
        imageUrl,
        rating,
        promo,
        isActive,
        stock,
        description,
      });
      dispatch(AddProductActionCreator(newProduct));
    } catch (error) {
      console.error(error.message);
    }
  };
}
export {
  ActionType,
  asyncSetProducts,
  AddProductActionCreator,
  asyncAddProduct,
  toggleWhishlistActionCreator,
  asyncToogleWhishlistProduct,
};
