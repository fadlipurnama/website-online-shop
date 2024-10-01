import Cookies from "js-cookie";
import * as userAPI from "./user";
import * as transactionAPI from "./transaction";
import * as cartAPI from "./cart";
import * as orderAPI from "./order";
import * as shipmentAPI from "./shipment";
import * as productAPI from "./product";

const api = (() => {
  function putAccessToken(token) {
    Cookies.set("accessToken", token, { sameSite: "Lax", secure: true });
  }
  function removeAccessToken() {
    Cookies.remove("accessToken");
  }
  function getAccessToken() {
    return Cookies.get("accessToken");
  }

  async function getAllCategories() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/category/getAllCategory`,
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    const { data } = responseJson;

    return data;
  }

  async function getAllBanners() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/banner/getAllBanners`,
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    const { data } = responseJson;

    return data;
  }
  async function getBannerById(bannerId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/banner/getBannerById/${bannerId}`,
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    const { data } = responseJson;

    return data;
  }



  async function updateProductById({ productData, productId }) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/product/updateProduct/${productId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    const { data } = responseJson;

    return data;
  }

  //  WISHLIST
  async function getDataWishlist() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/wishlist/getDataWishlist`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return responseJson;
  }

  async function addItemToWishlist(productId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/wishlist/addWishlist`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return responseJson;
  }
  async function deleteItemFromWishlist(productId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/wishlist/deleteWishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return responseJson;
  }


  return {
    updateProductById,
    deleteItemFromWishlist,
    getDataWishlist,
    getBannerById,
    removeAccessToken,
    putAccessToken,
    getAllCategories,
    addItemToWishlist,
    getAllBanners,
    ...userAPI,
    ...transactionAPI,
    ...cartAPI,
    ...orderAPI,
    ...shipmentAPI,
    ...productAPI,
  };
})();

export default api;
