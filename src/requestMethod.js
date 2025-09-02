import axios from "axios";
// Import logout action
import { store } from "./Redux/Store"; // Import Redux store
import { toast } from "react-toastify";
import { LogOut } from "./Redux/LoginSlice";

const BASE_URL = import.meta.env.VITE_STAFF_WEB_BASE_URL;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Create a reusable function to add the response interceptor
const addResponseInterceptor = (axiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response, // Pass successful response as is
    (error) => {
      const token = store.getState().user?.currentUser?.tokens?.access?.token;
      
      // Handle both 401 and your specific 400 "Access denied" case
      const isUnauthorized = error.response?.status === 401;
      const isAccessDenied = error.response?.status === 400 && 
                           error.response?.data?.message === "Access denied";
      
      if ((isUnauthorized || isAccessDenied) && token) {
        toast.error("Session expired. Please log in again.");
        store.dispatch(LogOut()); // Reset all state via logout
        
        // Add a small delay to ensure the toast shows before redirect
        setTimeout(() => {
          window.location.href = "/"; // Redirect to login page
        }, 1000);
      }

      return Promise.reject(error); // Pass error to further handlers
    }
  );
};

// Add interceptor to publicRequest
addResponseInterceptor(publicRequest);

// ✅ FIXED: Create userRequest with interceptor
export const userRequest = (token) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  
  // ✅ Add the same interceptor to the userRequest instance
  addResponseInterceptor(instance);
  
  return instance;
};

console.log("state", store.getState());