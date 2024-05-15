import Cookies from "js-cookie";

const api = (() => {
  function putAccessToken(token) {
    Cookies.set("accessToken", token);
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

  async function createProduct({
    name,
    brand,
    price,
    category,
    imageUrl,
    rating,
    promo,
    isActive,
    stock,
    description,
  }) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/products/createProduct`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          brand,
          price,
          category,
          imageUrl,
          rating,
          promo,
          isActive,
          stock,
          description,
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

  return {
    removeAccessToken,
    putAccessToken,
    getAllCategories,
    getOwnProfile,
    getAllProducts,
    createProduct,
    register,
    login,
  };
})();

export default api;
