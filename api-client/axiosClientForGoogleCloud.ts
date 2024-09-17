import axios from "axios";
import { URL_GOOGLE_TEXT_TO_SPEECH, API_KEY_GOOGLE_CLOUD } from "constants/googleapi";

const axiosClientForGoogleCloud = axios.create({
  baseURL: URL_GOOGLE_TEXT_TO_SPEECH, 
  headers: {
    "Content-Type": "application/json",
  },
  params:{
    key: API_KEY_GOOGLE_CLOUD,
  }
});


axiosClientForGoogleCloud.interceptors.response.use(
  (response) => {
    
    return response;
  },
  
  (error) => {
    // Xử lý lỗi   
    return Promise.reject(error);
  }
);

export default axiosClientForGoogleCloud;
