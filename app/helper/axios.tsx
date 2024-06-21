import axios from "axios";
import { getCookie } from "cookies-next";

// export const imageURL = "http://192.168.29.43:8100/"
export const imageURL = "https://storage.googleapis.com/";

// Define your base URL for the API
const baseURL = "http://192.168.29.43:8100/v1/api";
// export const baseURL = "https://ez-gamify.onrender.com/v1/api";

// Create an Axios instance with common configuration
const axiosInstance = axios.create({
  baseURL,
  method: "POST",
});

const api = async ({ url, data, headers }: any) => {
  try {
    const response = await axiosInstance({ url, data, headers });
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default api;
