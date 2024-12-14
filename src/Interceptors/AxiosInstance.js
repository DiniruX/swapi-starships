import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "https://swapi.dev/api", // Base URL for SWAPI
  timeout: 10000,                  // Set a timeout (optional)
});

export default axiosInstance;