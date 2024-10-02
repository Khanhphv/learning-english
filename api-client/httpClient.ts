import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
import { updateAccessToken, logout } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { store } from "@/stores";
import { log } from "console";



const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

httpClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('accessToken');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

);

httpClient.interceptors.response.use(
    
    (response: AxiosResponse) => {
        if(response && response.data){
            
            return response.data;   
        }
        return response;
    },
    async (error) => {
        const dispatch = useDispatch();
        const originalRequest = error.config;
        if (error.response) {
            
            const { status, data } = error.response;
            console.error(`API error: ${status}`, data);

            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try{
                    const refreshTokenResponse = await httpClient.post("/refresh");
                    if(refreshTokenResponse){
                        const newAccessToken = refreshTokenResponse.result.accessToken;

                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        dispatch(updateAccessToken(newAccessToken));
                        return httpClient(originalRequest);
                    }
                }catch(error){
                    console.log("Refresh token failed", error);
                    dispatch(logout());
                    toast.error("Your session has expired. Please log in again.");
                    return Promise.reject(error);
                }
            }

        }

        return Promise.reject(error);
    }
    
)

export default httpClient;