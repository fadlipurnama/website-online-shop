import Cookies from "js-cookie";
const API_URL_ORDER = import.meta.env.VITE_APP_API_URL;

function getAccessToken() {
  return Cookies.get("accessToken");
}

async function getOrderByUserId(userId) {
  const response = await fetch(
    `${API_URL_ORDER}/order/getOrderByUserId/${userId}`,
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
async function getOrderById(orderId) {
  const response = await fetch(
    `${API_URL_ORDER}/order/getOrderById/${orderId}`,
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

async function createOrder({
  grossAmount,
  customerName,
  customerEmail,
  shippingAddress,
  shippingCourier,
  shippingService,
  transactionId,
  userId,
  paymentMethod,
  products,
}) {
  const response = await fetch(`${API_URL_ORDER}/order/createOrder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      grossAmount,
      customerName,
      customerEmail,
      shippingAddress,
      transactionId,
      shippingCourier,
      shippingService,
      userId,
      paymentMethod,
      products,
    }),
  });

  const responseJson = await response.json();

  const { success, message } = responseJson;

  if (!success) {
    throw new Error(message); // Menghasilkan error jika permintaan gagal
  }

  return responseJson; // Mengembalikan respons jika berhasil
}

async function updateOrderStatus({
orderId,
status
}) {
  const response = await fetch(`${API_URL_ORDER}/order/updateOrderStatus/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({
      status
    }),
  });

  const responseJson = await response.json();

  const { success, message } = responseJson;

  if (!success) {
    throw new Error(message); // Menghasilkan error jika permintaan gagal
  }

  return responseJson; // Mengembalikan respons jika berhasil
}

export { createOrder, getOrderByUserId, getOrderById, updateOrderStatus };
