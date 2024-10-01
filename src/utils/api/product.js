import Cookies from "js-cookie";

function getAccessToken() {
  return Cookies.get("accessToken");
}

const API_URL_PRODUCT = import.meta.env.VITE_APP_API_URL;

async function getAllProducts() {
  const response = await fetch(`${API_URL_PRODUCT}/product/getAllProducts`);

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
    `${API_URL_PRODUCT}/product/getProductById/${productId}`,
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
  const response = await fetch(`${API_URL_PRODUCT}/product/createProduct`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: formData,
  });

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
    `${API_URL_PRODUCT}/product/deleteProduct/${productId}`,
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

async function searchProducts(searchTerm, limit) {
  const response = await fetch(
    `${API_URL_PRODUCT}/product/searchProducts?search=${encodeURIComponent(searchTerm)}&limit=${limit}`,
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

  const { data } = responseJson; // Mengambil suggestions dari respons API

  return data;
}

async function updateProductById({ productData, productId }) {
  const response = await fetch(
    `${API_URL_PRODUCT}/product/updateProduct/${productId}`,
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

export {
  searchProducts,
  getAllProducts,
  getProductById,
  updateProductById,
  createProduct,
  deleteProductById,
};
