import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URl } from "./Urls";

const api = axios.create({
  baseURL: BASE_URl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle unauthorized access
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      // Clear cookies and redirect to login
      Cookies.remove("jwt_token");
      Cookies.remove("role");
      localStorage.removeItem("role"); // Also clear from localStorage
      console.log(
        "Unauthorized access. Removing token and redirecting to login."
      );
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add the JWT token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("jwt_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
