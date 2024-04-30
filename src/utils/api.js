const api = (() => {
  // async function _fetchWithAuth(url, options = {}) {
  //   return fetch(url, {
  //     ...options,
  //     headers: {
  //       ...options.headers,
  //       Authorization: `Bearer ${getAccessToken()}`,
  //     },
  //   });
  // }

  function putAccessToken(token) {
    localStorage.setItem("accessToken", token);
  }

  function getAccessToken() {
    return localStorage.getItem("accessToken");
  }

  async function register({
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
  }) {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/register`,
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
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    const data = response.json();

    return data;
  }

  async function login({ email, password }) {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error (errorMessage);
    }

    const data = await response.json();
    return data;
  }

  async function getOwnProfile() {
    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/getUser`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw JSON.parse(errorMessage);
    }

    const user = await response.json();
    return user;
  }

  return {
    getOwnProfile,
    putAccessToken,
    register,
    login,
  };
})();

export default api;
