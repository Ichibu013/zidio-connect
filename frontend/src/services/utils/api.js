import axios from "axios";
import { BASE_URl } from "./Urls";

const api = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_API_URL, // Use environment variables
  baseURL: BASE_URl,
  timeout: 5000, // 5-second timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    // Adding token and role to browser storage
    localStorage.setItem("jwt_token", response.data.data.token);
    localStorage.setItem("role", response.data.data.role)
    console.log("Added jwt_token and Role to Local Storage");
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status == 401) {
      //Clear Token and Redirect to login
      localStorage.removeItem("jwt_token");
      console.log(
        "Remove token from local storage .. redirecting to login page"
      );
      window.location.href = "/Login";
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add the JWT token
api.interceptors.request.use(
  (config) => {
    // If token present add to header as Bearer token
    const token = localStorage.getItem("jwt_token")
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
