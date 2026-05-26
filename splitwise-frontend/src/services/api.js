import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// this function runs automatically before any request sent to the server.

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // checks local storage for named item like token

  //is there is token then it stores the token in this formate.
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  // returns the modified request so it can proceed.
  return req;
});

// this function runs specifically to handle errors.
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token"); // if status 401 mean unauthorized then it removes the invalid token and redirect user to the login page.
      window.location.href = "/login";
    }
    return Promise.reject(err);
  },
);

export default API;
