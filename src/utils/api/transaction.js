import Cookies from "js-cookie";

function getAccessToken() {
  return Cookies.get("accessToken");
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
async function deleteTransaction(transactionId) {
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}/transaction/deleteTransaction/${transactionId}`,
    {
      method: "DELETE",
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

export {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByUserId,
};
