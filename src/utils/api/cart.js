import Cookies from "js-cookie";
const API_URL_CART = import.meta.env.VITE_APP_API_URL

function getAccessToken() {
    return Cookies.get("accessToken");
  }


async function addItemToCart({ productId, quantity }) {
    const response = await fetch(
      `${API_URL_CART}/cart/addCart`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productId, quantity }),
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return responseJson;
  }

  async function deleteCartItem(cartItemId) {
    const response = await fetch(
      `${API_URL_CART}/cart/deleteCart/${cartItemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
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
  async function updateQuantity({ cartItemId, quantity }) {
    const response = await fetch(
      `${API_URL_CART}/cart/updateQuantity/${cartItemId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return responseJson;
  }
  async function getDataCart() {
    const response = await fetch(
      `${API_URL_CART}/cart/getDataCart`,
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
  async function clearCartUser() {
    const response = await fetch(
      `${API_URL_CART}/cart/clearCartUser`,
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


  export {deleteCartItem, clearCartUser, getDataCart, updateQuantity, addItemToCart}