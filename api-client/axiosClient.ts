import axios from "axios";
import { GOOGLE_API_PRE, GOOGLE_API_KEY_2 } from "constants/googleapi";

const axiosClient = axios.create({
  baseURL: GOOGLE_API_PRE, 
  headers: {
    "Content-Type": "application/json",
  },
  params:{
    key: GOOGLE_API_KEY_2,
  }
});


axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi
    return Promise.reject(error);
  }
);

export default axiosClient;
