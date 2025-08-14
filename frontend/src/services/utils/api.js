import axios from "axios";
import Cookies from "js-cookie";
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
    // Adding token and role to browser cookies
    // Cookies are accessible to middleware on server
    Cookies.set("jwt_token", response.data.data.token, { expires: 7 }); // Expires in 7 days
    Cookies.set("role", response.data.data.role, { expires: 7 });
    console.log("Added jwt_token and Role to Cookies");
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    if (status == 401) {
      // Clear Cookies and redirect to login
      Cookies.remove("jwt_token");
      Cookies.remove("role");
      console.log(
        "Remove token from local storage .. redirecting to login page"
      );
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

// Request interceptor to add the JWT token
api.interceptors.request.use(
  (config) => {
    // If token present add to header as Bearer token
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
