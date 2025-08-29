// api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // from .env
  withCredentials: true // if you’re using cookies/sessions
});

// ✅ Success interceptor
api.interceptors.response.use(
  (response) => {
    // Always wrap in the same format
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  },
  (error) => {
    if (error.response) {
      // Use backend shape but normalize
      return Promise.reject({
        success: false,
        message: error.response.data.message || "Request failed",
        path: error.response.data.path || null,
        status: error.response.status
      });
    }
    // Network or unexpected error
    return Promise.reject({
      success: false,
      message: "Network error. Please try again later.",
      path: null,
      status: 500
    });
  }
);

export default api;
