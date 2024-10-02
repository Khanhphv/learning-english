import httpClient from "api-client/httpClient";

const AuthApi = {

    login: async (username: string, password: string) => {
        return await httpClient.post("/authenticate", {username, password});
    },
    logout: async (token: string) => {
        return await httpClient.post("/logout", token);
    },
    register: async (username: string, password: string) => {
        return await httpClient.post("/register", {username, password});
    },
    checkUsername: async (username: string) => {
        return await httpClient.get(`/check-username?username=${username}`);
    }

}

export default AuthApi;