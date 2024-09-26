import api from "../../utils/api";

const ActionType = {
  SET_SHIPPING_OPTIONS_FAILURE: "SET_SHIPPING_OPTIONS_FAILURE",
  SET_SHIPPING_OPTIONS_REQUEST: "SET_SHIPPING_OPTIONS_REQUEST",
  RECEIVE_SHIPPING_OPTIONS_SUCCESS: "RECEIVE_SHIPPING_OPTIONS_SUCCESS",

  SET_COURIERS_FAILURE: "SET_COURIERS_FAILURE",
  SET_COURIERS_REQUEST: "SET_COURIERS_REQUEST",
  RECEIVE_COURIERS_SUCCESS: "RECEIVE_COURIERS_SUCCESS",

  SET_RATES_FAILURE: "SET_RATES_FAILURE",
  SET_RATES_REQUEST: "SET_RATES_REQUEST",
  RECEIVE_RATES_SUCCESS: "RECEIVE_RATES_SUCCESS",

  SET_PROVINCES_FAILURE: "SET_PROVINCES_FAILURE",
  SET_PROVINCES_REQUEST: "SET_PROVINCES_REQUEST",
  RECEIVE_PROVINCES_SUCCESS: "RECEIVE_PROVINCES_SUCCESS",

  SET_CITIES_FAILURE: "SET_CITIES_FAILURE",
  SET_CITIES_REQUEST: "SET_CITIES_REQUEST",
  RECEIVE_CITIES_SUCCESS: "RECEIVE_CITIES_SUCCESS",
};

function receiveShippingOptionsActionCreator(shippingOptions) {
  return {
    type: ActionType.RECEIVE_SHIPPING_OPTIONS_SUCCESS,
    payload: {
      shippingOptions,
    },
  };
}

function receiveCouriersActionCreator(couriers) {
  return {
    type: ActionType.RECEIVE_COURIERS_SUCCESS,
    payload: {
      couriers,
    },
  };
}

function receiveRatesActionCreator(rates) {
  return {
    type: ActionType.RECEIVE_RATES_SUCCESS,
    payload: {
      rates,
    },
  };
}

function receiveProvincesActionCreator(provinces) {
  return {
    type: ActionType.RECEIVE_PROVINCES_SUCCESS,
    payload: {
      provinces,
    },
  };
}

function receiveCitiesActionCreator(cities) {
  return {
    type: ActionType.RECEIVE_CITIES_SUCCESS,
    payload: {
      cities,
    },
  };
}

function asyncSetShippingOptions({ origin, destination, weight, courier, destinationType, originType }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_SHIPPING_OPTIONS_REQUEST });
    try {
      const shippingOptions = await api.getShippingOptions({ origin, destination, weight, courier, destinationType, originType });
      dispatch(receiveShippingOptionsActionCreator(shippingOptions));
    } catch (error) {
      dispatch({ type: ActionType.SET_SHIPPING_OPTIONS_FAILURE, payload: { error: error.message } });
    }
  };
}

function asyncSetCouriers() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_COURIERS_REQUEST });
    try {
      const couriers = await api.getCouriers();
      dispatch(receiveCouriersActionCreator(couriers));
    } catch (error) {
      dispatch({ type: ActionType.SET_COURIERS_FAILURE, payload: { error: error.message } });
    }
  };
}

function asyncCheckRates({ origin, destination, weight, courier, destinationType, originType }) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_RATES_REQUEST });
    try {
      const rates = await api.checkRates({ origin, destination, weight, courier, destinationType, originType });
      dispatch(receiveRatesActionCreator(rates));
    } catch (error) {
      dispatch({ type: ActionType.SET_RATES_FAILURE, payload: { error: error.message } });
    }
  };
}

function asyncSetProvinces() {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_PROVINCES_REQUEST });
    try {
      const provinces = await api.getProvinces();
      dispatch(receiveProvincesActionCreator(provinces));
    } catch (error) {
      dispatch({ type: ActionType.SET_PROVINCES_FAILURE, payload: { error: error.message } });
    }
  };
}

function asyncSetCities(provinceId) {
  return async (dispatch) => {
    dispatch({ type: ActionType.SET_CITIES_REQUEST });
    try {
      const cities = await api.getCities(provinceId);
      dispatch(receiveCitiesActionCreator(cities));
    } catch (error) {
      dispatch({ type: ActionType.SET_CITIES_FAILURE, payload: { error: error.message } });
    }
  };
}

export {
  ActionType,
  asyncSetShippingOptions,
  asyncSetCouriers,
  asyncCheckRates,
  asyncSetProvinces,
  asyncSetCities,
};
