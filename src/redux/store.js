import { configureStore } from "@reduxjs/toolkit";
import registerUserReducer from "./registerUser/reducer";
import authUserReducer from "./authUser/reducer";
import productsReducer from "./products/reducer";
import loginUserReducer from "./login/reducer";

const store = configureStore({
  reducer: {
    register: registerUserReducer,
    login: loginUserReducer,
    auth: authUserReducer,
    products: productsReducer,
  },
});

export default store;
