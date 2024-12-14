import axiosInstance from "./AxiosInstance";

// Configure request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add custom headers or log the request
    console.log("Request sent:", config);
    return config; // Always return the config
  },
  (error) => {
    // Handle request errors
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Configure response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log or modify the response
    console.log("Response received:", response);
    return response.data; // Return only the response data
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      console.error("Response error:", error.response);
    } else {
      console.error("Network or timeout error:", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;