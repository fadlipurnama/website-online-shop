import api from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";

const ActionType = {
  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",

  CLEARE_STATUS_UPDATED: "CLEARE_STATUS_UPDATED",
};

function asyncUpdateUser({ imageUrl, ...updateData }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.UPDATE_USER_REQUEST });
    try {
      const formUpdateUser = new FormData();
      for (const key in updateData) {
        if (Object.hasOwnProperty.call(updateData, key)) {
          const value = String(updateData[key]);
          formUpdateUser.append(key, value);
        }
      }
      formUpdateUser.append("imageUrl", imageUrl);
      const updateUser = await api.updateUser(formUpdateUser);
      dispatch(setAuthUserActionCreator(updateUser));
      dispatch({ type: ActionType.UPDATE_USER_SUCCESS });
    } catch (error) {
      dispatch({
        type: ActionType.UPDATE_USER_FAILURE,
        payload: { error: error.message },
      });
    }
    // try {
    //   const updated = await api.updateUser(imageUrl, updateData);
    //   dispatch(setAuthUserActionCreator(updated));
    //   dispatch({ type: ActionType.UPDATE_USER_SUCCESS });
    // } catch (error) {
    //   dispatch({
    //     type: ActionType.UPDATE_USER_FAILURE,
    //     payload: { error: error.message },
    //   });
    // }
  };
}

function asyncUpdateProfileUser({
  email,
  firstName,
  lastName,
  password,
  phoneNumber,
}) {
  return async (dispatch) => {
    dispatch({ type: ActionType.UPDATE_USER_REQUEST });
    try {
      const { data } = await api.updateProfileUser({
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
      });
      dispatch(setAuthUserActionCreator(data));
      dispatch({
        type: ActionType.UPDATE_USER_SUCCESS,
        payload: { message: "Data profile berhasil di ubah" },
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: ActionType.UPDATE_USER_FAILURE,
        payload: { error: error.message },
      });
    }
  };
}
function asyncChangePassword({ oldPassword, newPassword }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.UPDATE_USER_REQUEST });
    try {
      const response = await api.changePassword({ oldPassword, newPassword });
      console.log(response);
      dispatch({
        type: ActionType.UPDATE_USER_SUCCESS,
        payload: { message: "Password berhasil di ubah" },
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: ActionType.UPDATE_USER_FAILURE,
        payload: { error: error.message },
      });
    }
  };
}

function clearStatusUpdatedActionCreator() {
  return {
    type: ActionType.CLEARE_STATUS_UPDATED,
  };
}

export {
  ActionType,
  asyncUpdateProfileUser,
  asyncChangePassword,
  asyncUpdateUser,
  clearStatusUpdatedActionCreator,
};
