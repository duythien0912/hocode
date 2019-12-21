// in src/authProvider.js
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from "react-admin";
import decodeJwt from "jwt-decode";

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request("https://hocodevn.com/api/v1/login", {
      method: "POST",
      body: JSON.stringify({ email: username, password: password }),
      headers: new Headers({ "Content-Type": "application/json" })
    });
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        const decodedToken = decodeJwt(token);
        localStorage.setItem("AuthToken", token);
        localStorage.setItem("token", token);
        localStorage.setItem("permissions", decodedToken.data.role);
      });
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem("token");
    localStorage.removeItem("AuthToken");
    localStorage.removeItem("permissions");
  return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("AuthToken");
      localStorage.removeItem("permissions");
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    // return Promise.resolve();

    return localStorage.getItem("token") || localStorage.getItem("AuthToken")
      ? Promise.resolve()
      : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    return localStorage.getItem("permissions") //|| localStorage.getItem("AuthToken")
      ? Promise.resolve()
      : Promise.reject();
  }

  return Promise.reject("Unknown method");
};
