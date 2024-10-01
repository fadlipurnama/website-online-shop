import { configureStore } from "@reduxjs/toolkit";
import registerUserReducer from "./registerUser/reducer";
import authUserReducer from "./authUser/reducer";
import productsReducer from "./products/reducer";
import loginUserReducer from "./login/reducer";
import categoriesReducer from "./categories/reducer";
import detailProductReducer from "./detailProduct/reducer";
import detailBannerReducer from "./detailBanner/reducer";
import bannersReducer from "./banners/reducer";
import updateUserDetailReducer from "./updateUserDetail/reducer";
import cartsReducer from "./carts/reducer";
import wishlistReducer from "./wishlist/reducer";
import transactionReducer from "./transaction/reducer";
import shipmentReducer from "./shipment/reducer";
import orderReducer from "./order/reducer";
import searchTermReducer from "./searchTerm/reducer";

const store = configureStore({
  reducer: {
    register: registerUserReducer,
    login: loginUserReducer,
    auth: authUserReducer,
    products: productsReducer,
    categories: categoriesReducer,
    detailProduct: detailProductReducer,
    banners: bannersReducer,
    detailBanner: detailBannerReducer,
    updateUserDetail: updateUserDetailReducer,
    carts: cartsReducer,
    wishlist: wishlistReducer,
    shipment: shipmentReducer,
    order: orderReducer,
    transaction: transactionReducer,
    searchTerm: searchTermReducer,
  },
});

export default store;
