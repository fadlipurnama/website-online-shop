import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./users/reducer";
import authUserReducer from "./authUser/reducer";

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authUserReducer,
  },
});

export default store;
