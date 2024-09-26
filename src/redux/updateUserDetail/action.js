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

function clearStatusUpdatedActionCreator() {
  return {
    type: ActionType.CLEARE_STATUS_UPDATED,
  };
}

export { ActionType, asyncUpdateUser, clearStatusUpdatedActionCreator };
