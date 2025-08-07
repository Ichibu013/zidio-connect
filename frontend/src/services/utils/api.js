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

export default api;
