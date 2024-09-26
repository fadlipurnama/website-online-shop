import Cookies from "js-cookie";

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

  async function register({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  }) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phoneNumber,
          email,
          password,
        }),
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return responseJson;
  }

  async function login({ email, password }) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    return responseJson;
  }

  async function getOwnProfile() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/getDetailUser`,
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

    const { data } = responseJson;
    return data;
    // return responseJson;
  }

  async function updateUser(updateData) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/auth/updateUser`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          // "Content-Type": "application/json",
        },
        body: updateData,
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

  // API PRODUCT
  async function getAllProducts() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/product/getAllProducts`,
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    const { data } = responseJson;

    return data;
  }

  async function getProductById(productId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/product/getProductById/${productId}`,
    );

    const responseJson = await response.json();
    const { success, error } = responseJson;

    if (!success) {
      throw new Error(error);
    }

    const { data } = responseJson;

    return data;
  }

  async function createProduct(formData) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/product/createProduct`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: formData,
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

  async function deleteProductById(productId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/product/deleteProduct/${productId}`,
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

  // API Cart
  async function getDataCart() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/cart/getDataCart`,
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
  async function addItemToCart({ productId, quantity }) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/cart/addCart`,
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
      `${import.meta.env.VITE_APP_API_URL}/cart/deleteCart/${cartItemId}`,
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
      `${import.meta.env.VITE_APP_API_URL}/cart/updateQuantity/${cartItemId}`,
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

  async function createTransaction({
    grossAmount,
    firstName,
    lastName,
    customerEmail,
    phoneNumber,
    products,
    userId,
    shippingCourier,
    shippingService,
    shippingAddress,
    paymentMethod,
  }) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/transaction/createTransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
          grossAmount,
          firstName,
          lastName,
          customerEmail,
          phoneNumber,
          products,
          userId,
          shippingCourier,
          shippingService,
          shippingAddress,
          paymentMethod,
        }),
      },
    );

    const responseJson = await response.json();

    const { success, message } = responseJson;

    if (!success) {
      throw new Error(message);
    }

    return responseJson;
  }

  async function getProvinces() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/shipment/getProvinces`,
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
      `${import.meta.env.VITE_APP_API_URL}/shipment/getCities/${provinceId}`,
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
      `${import.meta.env.VITE_APP_API_URL}/shipment/checkRates`,
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
      `${import.meta.env.VITE_APP_API_URL}/shipment/getShippingOptions`,
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

  // async function getCouriers() {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_APP_API_URL}/shipment/courier`,
  //     {
  //       method: "GET",
  //     },
  //   );
  //   const responseJson = await response.json();
  //   const { success, error, data } = responseJson;

  //   if (!success) {
  //     throw new Error(error);
  //   }

  //   return data;
  // }

  async function getTransactionById(transactionId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/transaction/getTransactionById/${transactionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    const responseJson = await response.json();
  
    const { success, message } = responseJson;
  
    if (!success) {
      throw new Error(message);
    }
  
    return responseJson;
  }

  async function getOrdersByUserId(userId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/order/getOrdersByUserId/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    const responseJson = await response.json();
  
    const { success, message } = responseJson;
  
    if (!success) {
      throw new Error(message);
    }
  
    return responseJson;
  }
  
  async function getTransactionByUserId(userId) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/transaction/getTransactionByUserId/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
    );
    const responseJson = await response.json();
  
    const { success, message } = responseJson;
  
    if (!success) {
      throw new Error(message);
    }
  
    return responseJson;
  }

  return {
    updateProductById,
    getShippingOptions,
    getOrdersByUserId,
    getTransactionByUserId,
    getTransactionById,
    getProvinces,
    getCities,
    checkRates,
    deleteItemFromWishlist,
    updateQuantity,
    getProductById,
    getDataCart,
    // getCouriers,
    deleteProductById,
    getDataWishlist,
    getBannerById,
    removeAccessToken,
    deleteCartItem,
    putAccessToken,
    getAllCategories,
    getOwnProfile,
    addItemToWishlist,
    addItemToCart,
    updateUser,
    getAllProducts,
    createProduct,
    register,
    getAllBanners,
    login,
    createTransaction,
  };
})();

export default api;
