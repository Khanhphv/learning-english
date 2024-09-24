import axios, { AxiosResponse } from "axios";


const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers:{
        "Content-Type": "application/json",
    }
});

httpClient.interceptors.request.use(
    async (config) => {
        // const token = localStorage.getItem('access_token');
        // if(token){
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
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
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            console.error(`API error: ${status}`, data);

            if (status === 401) {
                console.log('Unauthorized error - redirecting to login');
            }

            return Promise.reject(data);
        }

        return Promise.reject(error);
    }
    
)

export default httpClient;