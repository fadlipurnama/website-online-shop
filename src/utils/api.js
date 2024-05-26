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

  return {
    updateProductById,
    getProductById,
    deleteProductById,
    getBannerById,
    removeAccessToken,
    putAccessToken,
    getAllCategories,
    getOwnProfile,
    getAllProducts,
    createProduct,
    register,
    getAllBanners,
    login,
  };
})();

export default api;
