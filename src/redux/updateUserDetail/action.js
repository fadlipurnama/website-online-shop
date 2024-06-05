import api from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";

const ActionType = {
  UPDATE_USER_REQUEST: "UPDATE_USER_REQUEST",
  UPDATE_USER_FAILURE: "UPDATE_USER_FAILURE",
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",

  CLEARE_STATUS_UPDATED: "CLEARE_STATUS_UPDATED",
};

function asyncUpdateUser({ ...updateData }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.UPDATE_USER_REQUEST });

    try {
      const updated = await api.updateUser(updateData);
      dispatch(setAuthUserActionCreator(updated));
      dispatch({ type: ActionType.UPDATE_USER_SUCCESS });
    } catch (error) {
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

export { ActionType, asyncUpdateUser, clearStatusUpdatedActionCreator };
