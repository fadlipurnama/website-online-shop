// import Cookies from "js-cookie";


// function getAccessToken() {
//     return Cookies.get("accessToken");
//   }

const API_URL_SHIPMENT = import.meta.env.VITE_APP_API_URL

async function getProvinces() {
    const response = await fetch(
      `${API_URL_SHIPMENT}/shipment/getProvinces`,
      {
        method: "GET",
      },
    );
    const responseJson = await response.json();
    const { success, error, data } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return data;
  }

  async function getCities(provinceId) {
    const response = await fetch(
      `${API_URL_SHIPMENT}/shipment/getCities/${provinceId}`,
      {
        method: "GET",
      },
    );
    const responseJson = await response.json();
    const { success, error, data } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return data;
  }
  async function checkRates(data) {
    const response = await fetch(
      `${API_URL_SHIPMENT}/shipment/checkRates`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const responseJson = await response.json();
    const { success, error, data: costData } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return costData;
  }

  async function getShippingOptions(data) {
    const response = await fetch(
      `${API_URL_SHIPMENT}/shipment/getShippingOptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const responseJson = await response.json();
    const { success, error, data: costData } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return costData;
  }

  async function getTracking({waybill, courier}) {
    const response = await fetch(
      `${API_URL_SHIPMENT}/shipment/checkWaybill`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({waybill, courier}),
      },
    );
    const responseJson = await response.json();
    const { success, error, data: costData } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return costData;
  }



  export {getCities, getProvinces, getTracking, getShippingOptions, checkRates}