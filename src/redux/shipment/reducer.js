import { ActionType } from "./action";

const initialState = {
  shippingOptions: null,
  couriers: null,
  rates: null,
  provinces: null,
  cities: null,
  loading: false,
  error: false,
  message: null,
};

function shipmentReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.SET_SHIPPING_OPTIONS_REQUEST:
    case ActionType.SET_COURIERS_REQUEST:
    case ActionType.SET_RATES_REQUEST:
    case ActionType.SET_PROVINCES_REQUEST:
    case ActionType.SET_CITIES_REQUEST:
      return { ...state, loading: true, error: false };
    case ActionType.SET_SHIPPING_OPTIONS_FAILURE:
    case ActionType.SET_COURIERS_FAILURE:
    case ActionType.SET_RATES_FAILURE:
    case ActionType.SET_PROVINCES_FAILURE:
    case ActionType.SET_CITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload.error,
      };
    case ActionType.RECEIVE_SHIPPING_OPTIONS_SUCCESS:
      return {
        ...state,
        shippingOptions: action.payload.shippingOptions,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.RECEIVE_COURIERS_SUCCESS:
      return {
        ...state,
        couriers: action.payload.couriers,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.RECEIVE_RATES_SUCCESS:
      return {
        ...state,
        rates: action.payload.rates,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.RECEIVE_PROVINCES_SUCCESS:
      return {
        ...state,
        provinces: action.payload.provinces,
        loading: false,
        error: false,
        message: null,
      };
    case ActionType.RECEIVE_CITIES_SUCCESS:
      return {
        ...state,
        cities: action.payload.cities,
        loading: false,
        error: false,
        message: null,
      };
    default:
      return state;
  }
}

export default shipmentReducer;
