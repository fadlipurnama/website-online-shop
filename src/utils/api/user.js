import Cookies from "js-cookie";

const API_URL_AUTH = import.meta.env.VITE_APP_API_URL;

function getAccessToken() {
  return Cookies.get("accessToken");
}

async function updateUser(updateData) {
  const response = await fetch(`${API_URL_AUTH}/auth/updateUser`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      // "Content-Type": "application/json",
    },
    body: updateData,
  });

  const responseJson = await response.json();
  const { success, error } = responseJson;

  if (!success) {
    throw new Error(error);
  }

  const { data } = responseJson;
  return data;
}

async function getOwnProfile() {
  const response = await fetch(`${API_URL_AUTH}/auth/getDetailUser`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const responseJson = await response.json();
  const { success, error } = responseJson;

  if (!success) {
    throw new Error(error);
  }

  const { data } = responseJson;
  return data;
  // return responseJson;
}

async function register({ firstName, lastName, phoneNumber, email, password }) {
  const response = await fetch(`${API_URL_AUTH}/auth/register`, {
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
  });

  const responseJson = await response.json();
  const { success, error } = responseJson;

  if (!success) {
    throw new Error(error);
  }

  return responseJson;
}

async function login({ email, password }) {
  const response = await fetch(`${API_URL_AUTH}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();
  const { success, error } = responseJson;

  if (!success) {
    throw new Error(error);
  }

  return responseJson;
}
async function updateProfileUser({
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
}) {
  const response = await fetch(`${API_URL_AUTH}/auth/updateProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
      
    },
    body: JSON.stringify({ firstName, lastName, phoneNumber, email, password }),
  });

  const responseJson = await response.json();
  const { success, error } = responseJson;

  if (!success) {
    throw new Error(error);
  }

  return responseJson;
}
async function changePassword({
 oldPassword,
 newPassword,
}) {
  const response = await fetch(`${API_URL_AUTH}/auth/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
      
    },
    body: JSON.stringify({ oldPassword,
      newPassword }),
  });

  const responseJson = await response.json();
  const { success, error } = responseJson;

  if (!success) {
    throw new Error(error);
  }

  return responseJson;
}
export { getOwnProfile,changePassword, updateUser, updateProfileUser, register, login };
